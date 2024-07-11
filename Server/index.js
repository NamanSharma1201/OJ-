import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/user.js";
import problemRouter from "./routes/problem.js";

dotenv.config();

const port = process.env.PORT || 8000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

connectDB();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/problem", problemRouter);

// Socket.io connection
io.on("connection", (socket) => {
  // console.log("A user connected");

  socket.on("sendMessage", (message) => {
    const { name, message: msg } = message;
    io.emit("receiveMessage", { name, message: msg });
  });

  socket.on("disconnect", () => {});
});

server.listen(port, () => {
  console.log(`Server running on port ${port} ....`);
});
