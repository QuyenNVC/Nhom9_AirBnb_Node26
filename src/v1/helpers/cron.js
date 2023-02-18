const { CronJob } = require("cron");
const User = require("../databases/mysql/User");
const { Op } = require("sequelize");

module.exports = {
  cronDeleteUnverifyAccounts: new CronJob("0 * * * * *", function () {
    const time = new Date(new Date().getTime() - 2 * 60 * 60000);
    User.destroy({
      where: {
        [Op.and]: [
          { verifiedAt: { [Op.is]: null } },
          { createdAt: { [Op.lt]: time } },
        ],
      },
    });
  }),
};
