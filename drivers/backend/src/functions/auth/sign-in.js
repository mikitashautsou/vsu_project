import jwt from "jsonwebtoken";
import { connectToDB } from "../../common/db.js";
import { JWT_SECRET } from "../../config/config.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export default async (req, res) => {
  const { body } = req;
  const isValid = validateBody(req, res, body);
  if (!isValid) {
    return;
  }
  const { passportNo, password } = body;
  const authDb = await connectToDB();
  const user = await authDb.collection("users").findOne({
    passportNo,
    password,
  });
  if (!user) {
    res.json({
      status: "error",
      message: "Invalid username or password",
    });
    return;
  }
  const token = await createJWT(user);
  const { password: _, ...sanitizedUser } = user;
  res.json({ token, user: sanitizedUser });
};

const validateBody = (req, res, body) => {
  if (!body.passportNo) {
    res.json({
      status: "error",
      message: "passportNo was not specified",
    });
    return false;
  }
  if (!body.password) {
    res.json({
      status: "error",
      message: "Password was not specified",
    });
    return false;
  }
  return true;
};

const createJWT = (user) => {
  return jwt.sign(user, JWT_SECRET);
};
