import express from "express";
import {
  getAllProblems,
  createNewProblem,
  getProblemById,
  editProblem,
  deleteProblem,
} from "../controllers/problem.js";

import { restrictToAdmin } from "../middlewares/problem.js";

const problemRouter = express.Router();

problemRouter.get("/all", getAllProblems);
problemRouter.post("/create", restrictToAdmin, createNewProblem);
problemRouter.get("/:id", getProblemById);
problemRouter.patch("/:id", restrictToAdmin, editProblem);
problemRouter.delete("/:id", restrictToAdmin, deleteProblem);

export default problemRouter;
