import { connectToDB } from "../../common/db.js";
import { DB_NAME, JWT_SECRET } from "../../config/config.js";
import jwt from "jsonwebtoken";
import { validateBody } from "../../common/validation.js";

/**
 * @param {import("express").Request} req
 */
export default async (req, res) => {
  try {
    const { body } = req;
    validateBody(req, ["username", "password"]);
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
      return;
    }
    const token = await createJWT(user);
    const { password: _, ...sanitizedUser } = user;
    res.json({ token, user: sanitizedUser });
  } catch (e) {
    res.status(400).json({
      status: "error",
      message: e.message,
    });
  }
};

const createJWT = (user) => {
  return jwt.sign(user, JWT_SECRET);
};
