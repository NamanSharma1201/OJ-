import mongoose from "mongoose";

export const connectDB = async function () {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("DB connected");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
};

export default connectDB;
