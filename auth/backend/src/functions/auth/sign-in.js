import { connectToDB } from "../../common/db.js";
import { DB_NAME, JWT_SECRET } from "../../config/config.js";
import jwt from "jsonwebtoken";
import { validateBody } from "../../common/validation.js";

/**
 * @param {import("express").Request} req
 */
export default async (req, res) => {
  const { body } = req;
  const isValid = validateBody(req, res, body, ["username", "password"]);
  if (!isValid) {
    return;
  }
  const { username, password } = body;
  const authDb = await connectToDB(DB_NAME);
  const user = await authDb.collection("users").findOne({
    username,
    password,
  });
  if (!user) {
    res.status(400).json({
      status: "error",
      message: "Invalid username or password",
    });
  }
  const token = await createJWT(user);
  const { password: _, ...sanitizedUser } = user;
  res.json({ token, user: sanitizedUser });
};

const createJWT = (user) => {
  return jwt.sign(user, JWT_SECRET);
};
