const bcrypt = require("bcrypt");
const {
  emailValidate,
  passwordValidate,
} = require("../validate/authValidateInput");
const { User } = require("../models/userModel");

exports.signUpController = async (req, res) => {
  try {
    const { email, password } = req.body;
    emailValidate(email);
    passwordValidate(password);

    const hashedPassword = await bcrypt.hash(password, 10);

    const document = await User.create({
      email: email,
      password: hashedPassword,
    });

    const token = await document.generateToken();

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 60 * 60 * 1000,
      })
      .json({ message: "signUp successfully", success: true });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error : " + error.message, success: false });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    emailValidate(email);
    passwordValidate(password);

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found", success: false });
    }

    if (!(await user.bcryptValidPassword(password))) {
      return res
        .status(400)
        .json({ message: "Enter valid credentials", success: false });
    }

    const token = await user.generateToken();
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 60 * 60 * 1000,
      })
      .json({ message: "signIn successfully", success: true });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error : " + error.message, success: false });
  }
};

exports.logOutController = (req, res) => {
  try {
    res
      .cookie("token", "null", {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: "0",
      })
      .json({ message: "logout successfully", success: true });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error : " + error.message, success: false });
  }
};

exports.isAuthenticatedController = async (req, res) => {
  try {
    res.json({ message: "authenticated successfully", success: true });
  } catch (error) {
    res.status(401).json({ message: error.message, success: false });
  }
};
