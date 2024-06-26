import Problem from "../models/problem.js";

export const getAllProblems = async (req, res) => {
  try {
    const allProblems = await Problem.find({});
    return res.json(allProblems);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const createNewProblem = async (req, res) => {
  const problem = req.body;
  const problemCount = await Problem.countDocuments({});

  if (
    !problem.title ||
    !problem.description ||
    !problem.inputFormat ||
    !problem.outputFormat ||
    !problem.difficulty ||
    !problem.topic ||
    !problem.author
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (
    problem.difficulty !== "easy" &&
    problem.difficulty !== "medium" &&
    problem.difficulty !== "hard"
  ) {
    return res.status(400).json({ message: "Invalid difficulty level" });
  }

  const duplicateProblem = await Problem.findOne({
    title: problem.title,
    description: problem.description,
    inputFormat: problem.inputFormat,
    outputFormat: problem.outputFormat,
  });

  if (duplicateProblem) {
    return res.status(400).json({ message: "This problem already exists" });
  }

  try {
    const newProblem = await Problem.create({
      problemID: problemCount + 1,
      ...problem,
    });
    return res.status(201).json(newProblem);
  } catch (error) {
    console.error("Error creating problem:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getProblemById = async (req, res) => {
  const { id } = req.params;
  try {
    const problem = await Problem.findOne({ problemID: id });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    return res.json(problem);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const editProblem = async (req, res) => {
  const { id } = req.params;

  const newProblemData = req.body;

  if (
    !newProblemData.title ||
    !newProblemData.description ||
    !newProblemData.inputFormat ||
    !newProblemData.outputFormat ||
    !newProblemData.difficulty ||
    !newProblemData.topic ||
    !newProblemData.author
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (
    newProblemData.difficulty !== "easy" &&
    newProblemData.difficulty !== "medium" &&
    newProblemData.difficulty !== "hard"
  ) {
    return res.status(400).json({ message: "Invalid difficulty level" });
  }

  try {
    const problem = await Problem.findOne({ problemID: id });

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    Object.assign(problem, newProblemData);
    await problem.save();
    return res.json(problem);
  } catch (error) {
    return res.status(500).json({ message: "Can't update problem" });
  }
};

export const deleteProblem = async (req, res) => {
  const { id } = req.params;

  try {
    const problem = await Problem.findOneAndDelete({ problemID: id });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    return res.json({ message: "Problem deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Cannot delete problem" });
  }
};
