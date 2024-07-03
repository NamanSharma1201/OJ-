import jwt from "jsonwebtoken";

export const setUser = async function (user) {
  if (!user) return null;
  const token = jwt.sign(
    {
      email: user.email,
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "15d" }
  );

  return token;
};

export const getUser = async function (token) {
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    return decode;
  } catch (error) {
    console.log("Failed to authenticate token");
    return null;
  }
};
