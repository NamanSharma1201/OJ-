import express from "express";
import UserController from "../controllers/user.js";
import { restrictToLoggedIn } from "../middlewares/auth.js";

const userRouter = express.Router();

// Public Routes
userRouter.get("/logout", UserController.userLogout);
userRouter.post("/signup", UserController.userRegistration);
userRouter.post("/login", UserController.userLogin);
userRouter.post("/reset", UserController.sendPasswordResetEmail);
userRouter.post("/reset/:userID/:token", UserController.resetPassword);

// Protected Routes
userRouter.post(
  "/changepassword",
  restrictToLoggedIn,
  UserController.changeUserPassword
);

export default userRouter;
