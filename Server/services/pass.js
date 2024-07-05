import bcrypt from "bcrypt";

export const hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  // console.log(hashedPassword);
  return hashedPassword;
};

export const validatePassword = async function (password, hashedPassword) {
  try {
    if (!password || !hashedPassword) {
      throw new Error("Both password and hashedPassword are required");
    }

    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.error("Error in validatePassword:", error);
    throw error; // Propagate the error to the caller
  }
};
