import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  problemID: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  inputFormat: {
    type: String,
    required: true,
  },
  outputFormat: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  askedIn: {
    type: String,
    required: false,
  },
  submissions: {
    type: Number,
    default: 0,
  },
  accuracy: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  correctSubmission: {
    type: Number,
    default: 0,
  },
  hiddenInputs: {
    type: [String],
    default: [],
  },
  hiddenOutputs: {
    type: [String],
    default: [],
  },
});

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
