import { getUser } from "../services/auth.js";
import User from "../models/user.js";

export const restrictToLoggedIn = async (req, res, next) => {
  const token = req.cookies?.uid;

  if (!token) {
    return res.redirect("/api/user/login");
  }

  let decode;
  try {
    decode = await getUser(token);
  } catch (err) {
    console.error("Error decoding token:", err);
    return res.redirect("/api/user/login");
  }

  if (!decode) {
    return res.redirect("/api/user/login");
  }

  try {
    const user = await User.findById(decode.id);
    if (!user) {
      return res.redirect("/api/user/login");
    }

    req.user = user; // Attach user to req object

    next();
  } catch (error) {
    console.error("Error finding user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
