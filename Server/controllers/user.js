import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { setUser, getUser } from "../services/auth.js";
import { validatePassword, hashPassword } from "../services/pass.js";
import transporter from "../services/mail.js"; // Note the correction from 'tranporter' to 'transporter'

class UserController {
  static updateSolvedProblems = async function (req, res) {
    const { email, problemID } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.problemsSolved.includes(problemID)) {
        return res.send(user.problemsSolved);
      }

      user.problemsSolved.push(problemID);

      await user.save();

      return res.send(user.problemsSolved);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  };

  static userLogout = async (req, res) => {
    res.clearCookie("uid");
    res.redirect("/api/login");
  };

  static userRegistration = async (req, res) => {
    const { name, password, email } = req.body;

    if (!(name && password && email)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const hashedPassword = await hashPassword(password);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      const token = await setUser(user);
      res.cookie("uid", token, {
        secure: true,
        sameSite: "none",
      });

      return res.json({ message: "Registration successful", uid: token });
    } catch (error) {
      return res.status(500).json({ message: "Registration Failed" });
    }
  };

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
      res.cookie("uid", token, {
        sameSite: "none",
        secure: true,
      });

      return res.json({
        message: "Login successful",
        uid: token,
        name: user.name,
        email: user.email,
        problemsSolved: user.problemsSolved,
      });
    } catch (error) {
      return res.status(500).json({ message: "Login Failed" });
    }
  };

  static sendPasswordResetEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const token = jwt.sign(
        { userID: user._id },
        user._id + process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      const resetLink = `http://localhost:5173/reset/${user._id}/${token}`;

      // Send email logic here
      await transporter.sendMail({
        from: '"Your App" <yourapp@example.com>',
        to: user.email,
        subject: "Password Reset",
        text: `Click the following link to reset your password: ${resetLink}`,
        html: `<p>Click the following link to reset your password: <a href="${resetLink}">Reset Password</a></p>`,
      });

      return res.json({
        message: "Password reset email sent",
        link: resetLink,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to send password reset email" });
    }
  };

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
          return res.status(200).json({ message: "success" });
        } else {
          return res.status(401).json({ message: "Invalid request" });
        }
      });
    } catch (error) {
      return res.status(500).json({ message: "Failed to reset password" });
    }
  };

  static changeUserPassword = async (req, res) => {
    const { newPassword } = req.body;
    console.log(newPassword);
    const userID = req.user.id; // Assuming the user ID is stored in req.user

    if (!newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const user = await User.findById(userID);
      if (!user) {
        return res.status(404).json({ message: "User not Authorized" });
      }

      // console.log(user.password);

      user.password = await hashPassword(newPassword);
      // console.log(user.password);
      await user.save();

      return res.json({ message: "Password changed successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Failed to change password" });
    }
  };
}

export default UserController;
