import express, { urlencoded } from "express";
import path from "path";
import dotenv from "dotenv";
import codeRouter from "./routes/code.js";
import makeFolders from "./services/makeFolders.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

makeFolders();

app.use("/", codeRouter);
app.listen(port, () => {
  console.log("Online-Compiler ONLINE ");
});
