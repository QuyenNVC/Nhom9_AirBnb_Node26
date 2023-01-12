const { createTransport } = require("nodemailer");
const { logger } = require("./logger");

module.exports = async (options) => {
  try {
    const { to, subject, html } = options;
    const transporter = createTransport({
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
      secure: process.env.MAILER_SECURE,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.MAILER_USER,
      to,
      subject,
      html,
    };

    const result = await transporter.sendMail(mailOptions);
    return result ? true : false;
  } catch (error) {
    logger.error(error.stack);
    return false;
  }
};
