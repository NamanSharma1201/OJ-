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
    enum: ["easy", "medium", "hard"],
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
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
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
});

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
