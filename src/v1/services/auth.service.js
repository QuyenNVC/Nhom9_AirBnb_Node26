const { compareSync } = require("bcrypt");
const { sign, verify, JsonWebTokenError } = require("jsonwebtoken");
const User = require("../databases/mysql/User");
const { ROLE } = require("../helpers/constants");
const { generateToken } = require("../helpers/jwt");
const mailer = require("../helpers/mailer");
const { isEmail } = require("../helpers/validators");
const { AppError } = require("../middlewares/error");

module.exports = {
  signUp: async (data) => {
    try {
      const { name, email, password, phone, birthDay, gender, role } = data;
      if (
        !email ||
        !password ||
        !name ||
        !phone ||
        !birthDay ||
        !role ||
        gender === undefined
      ) {
        throw new AppError(400, "Missing user's data!");
      }

      if (!isEmail(email)) {
        throw new AppError(400, "Invalid email!");
      }

      if (role != ROLE.USER && role != ROLE.ADMIN) {
        throw new AppError(400, "Invalid role!");
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (user) {
        throw new AppError(400, "Email exists!");
      }

      const createdUser = await User.create(data);
      const code = sign(
        {
          id: createdUser.id,
          email,
        },
        process.env.VERIFY_TOKEN_KEY,
        {
          expiresIn: parseInt(process.env.VERIFY_TOKEN_TIME),
        }
      );
      url = process.env.BASE_URL + "api/v1/auth/verify?code=" + code;
      const isSendEmail = await mailer({
        to: email,
        subject: "Welcome to Airbnb!",
        html:
          `<div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
              <p style="color: black">
                Please click this <a href="` +
          url +
          `">link</a> to verify your account!
              </p>
              <p style="color: black">This email is only valid for 2 hours</p>
            </div>
          </div>`,
      });
      if (isSendEmail) {
        return "Please verify account in your email registered!";
      } else {
        await User.destroy({
          where: {
            id: createdUser.id,
          },
        });
        throw new AppError(400, "Register failed!");
      }
    } catch (error) {
      throw error;
    }
  },
  verifyAccount: async (code) => {
    try {
      if (!code) {
        throw new AppError(400, "Bad request!");
      }

      const payload = verify(code, process.env.VERIFY_TOKEN_KEY);
      const user = await User.findByPk(payload.id);

      if (!user) {
        throw new AppError(400, "User not found!");
      }

      if (user.verifiedAt) {
        throw new AppError(400, "User already verified!");
      }

      await user.update({ verifiedAt: new Date() });

      return "Verify success!";
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        error = new AppError(400, "Bad request!");
      }
      throw error;
    }
  },
  signIn: async (credential) => {
    try {
      const { email, password } = credential;
      if (!email || !password) {
        throw new AppError(400, "Require email and password!");
      }
      const user = await User.findOne({
        where: {
          email,
        },
        attributes: {
          include: ["password"],
        },
      });

      if (!user) {
        throw new AppError(401, "Invalid email or password!");
      }

      if (!compareSync(password, user.password ? user.password : "")) {
        throw new AppError(401, "Invalid email or password");
      }

      if (!user.verifiedAt) {
        throw new AppError(401, "Account is not verified!");
      }

      return generateToken(user);
    } catch (error) {
      throw error;
    }
  },
  loginSocialSuccess: async (data) => {
    try {
      let user = await User.findOne({
        where: {
          email: data.email,
        },
      });

      if (!user) {
        user = await User.create({
          ...data,
          role: ROLE.USER,
          verifiedAt: new Date(),
        });
      }

      return generateToken(user);
    } catch (error) {
      throw error;
    }
  },
};
