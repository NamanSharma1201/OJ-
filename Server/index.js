import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/user.js";
import problemRouter from "./routes/problem.js";

dotenv.config();

const port = process.env.PORT || 8000;
const app = express();
connectDB();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// Handle preflight requests

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
//Routes

app.use("/api/user", userRouter);
app.use("/api/problem", problemRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port} ....`);
});
