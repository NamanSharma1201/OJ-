import { getUser } from "../services/auth.js";
import User from "../models/user.js";

export const restrictToAdmin = async function (req, res, next) {
  const token = req.cookies?.uid;
  if (!token) {
    return res.redirect("/api/user/login");
  }
  const decode = await getUser(token);
  if (!decode) {
    return res.redirect("/api/user/login");
  }
  try {
    const user = await User.findById(decode.id);
    if (!user || user.role === "user") {
      return res.redirect("/api/user/login");
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Can not verify the user Role" });
  }
};
