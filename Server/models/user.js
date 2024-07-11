import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  problemsSolved: {
    type: [Number],
    default: [],
    validate: {
      validator: function (array) {
        return array.length === new Set(array).size;
      },
      message: "Problems solved must contain unique values",
    },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
