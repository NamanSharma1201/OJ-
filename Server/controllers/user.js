import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { setUser, getUser } from "../services/auth.js";
import { validatePassword, hashPassword } from "../services/pass.js";
import { tranporter } from "../services/mail.js";

class UserController {
  //////////////////////////////////////////////////////////
  // User Login
  ///////////////////////////////////////////////////////////
  static userLogout = async (req, res) => {
    res.clearCookie("uid");
    res.redirect("/api/login");
  };
  /////////////////////////////////////////////////////////
  // User Registration
  /////////////////////////////////////////////////////////
  static userRegistration = async (req, res) => {
    const { username, password, email } = req.body;

    if (!(username, password, email)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });

      if (existingUser) {
        if (existingUser.email === email) {
          return res.status(400).json({ message: "Email already exists" });
        }
        if (existingUser.username === username) {
          return res.status(400).json({ message: "Username already taken" });
        }
      }

      const hashedPassword = await hashPassword(password);

      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      const token = await setUser(user);
      res.cookie("uid", token);

      return res.json({ message: "Registration successful" });
    } catch (error) {
      console.error("Error during registration:", error);
      return res.status(500).json({ message: "Registration Failed" });
    }
  };

  /////////////////////////////////////////////////////////
  // User Login
  /////////////////////////////////////////////////////////
  static userLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Enter a valid email" });
      }

      const isPasswordValid = await validatePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      req.body.password = undefined;

      const token = await setUser(user);
      res.cookie("uid", token);

      return res.json({ message: "Login successful" });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Login Failed" });
    }
  };

  /////////////////////////////////////////////////////////
  // Change User Password
  /////////////////////////////////////////////////////////
  static changeUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!(oldPassword && newPassword)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const user = req.user;

      const isOldPasswordValid = await validatePassword(
        oldPassword,
        user.password
      );
      if (!isOldPasswordValid) {
        return res.status(401).json({ message: "Incorrect old password" });
      }

      const hashedPassword = await hashPassword(newPassword);
      user.password = hashedPassword;
      await user.save();

      req.body.password = undefined;

      return res.json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Error during password change:", error);
      return res.status(500).json({ message: "Password change failed" });
    }
  };

  /////////////////////////////////////////////////////////
  // Send Password Reset Email
  /////////////////////////////////////////////////////////
  static sendPasswordResetEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(401)
          .json({ message: "No user found with this email" });
      }

      const secret = user._id + process.env.JWT_SECRET;
      const token = jwt.sign({ userID: user._id }, secret, {
        expiresIn: "15m",
      });

      const link = `http://localhost:3000/api/user/reset/${user._id}/${token}`;
      const info = await tranporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: "Password Reset Request",
        text: `The link below will be active for 15 minutes:\n\n${link}`,
        html: `<h3><a href="${link}">Click this link to reset your password</a></h3>`,
      });

      return res.json({
        message: "Password reset link has been sent to your email",
        link: link,
      });
    } catch (error) {
      console.error("Error sending password reset email:", error);
      return res
        .status(500)
        .json({ message: "Failed to send password reset email" });
    }
  };

  /////////////////////////////////////////////////////////
  // Reset Password
  /////////////////////////////////////////////////////////
  static resetPassword = async (req, res) => {
    const { userID, token } = req.params;
    const { password } = req.body;

    if (!userID || !token || !password) {
      return res.status(400).json({ message: "Invalid request" });
    }

    try {
      const user = await User.findById(userID);
      if (!user) {
        return res.status(401).json({ message: "Invalid request" });
      }

      const secret = user._id + process.env.JWT_SECRET;

      jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Invalid or expired token" });
        }

        if (decoded.userID === userID) {
          const hashedPassword = await hashPassword(password);
          user.password = hashedPassword;
          await user.save();

          req.body.password = undefined;

          return res.redirect("/api/user/login");
        } else {
          return res.status(401).json({ message: "Invalid request" });
        }
      });
    } catch (error) {
      console.error("Error resetting password:", error);
      return res.status(500).json({ message: "Failed to reset password" });
    }
  };
}

export default UserController;
