import express from "express";
import {
  getAllProblems,
  createNewProblem,
  getProblemById,
  editProblem,
  deleteProblem,
  updateProblemStats,
} from "../controllers/problem.js";

import { restrictToAdmin } from "../middlewares/problem.js";

const problemRouter = express.Router();

problemRouter.get("/all", getAllProblems);
problemRouter.post("/create", createNewProblem);
problemRouter.get("/:id", getProblemById);
problemRouter.patch("/update/:id", updateProblemStats);
problemRouter.patch("/:id", editProblem);
problemRouter.delete("/:id", deleteProblem);

export default problemRouter;
