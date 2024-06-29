import { Router } from "express";
import { executeCode } from "../controllers/code.js";

const codeRouter = Router();

codeRouter.get("/", (req, res) => {
  res.redirect("/home");
});
codeRouter.get("/home", (req, res) => {
  res.render("home");
});

codeRouter.post("/run", executeCode);
export default codeRouter;
