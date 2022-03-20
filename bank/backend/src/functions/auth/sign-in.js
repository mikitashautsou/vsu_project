import { connectToDB } from "../../common/db.js";
import { DB_NAME, JWT_SECRET } from "../../config/config.js";
import jwt from "jsonwebtoken";
import { generateRandomNumber } from "../../common/num.js";

/**
 * @param {import("express").Request} req
 */
export default async (req, res) => {
  const { body } = req;
  const isValid = validateBody(req, res, body);
  if (!isValid) {
    return;
  }
  const { accountId, password } = body;
  const authDb = await connectToDB(DB_NAME);
  const user = await authDb.collection("users").findOne({
    accountId,
    password,
  });
  if (!user) {
    return {
      status: "error",
      message: "Invalid username or password",
    };
  }
  const token = await createJWT(user);
  const { password: _, ...sanitizedUser } = user;
  res.json({ token, user: sanitizedUser });
};

const validateBody = (req, res, body) => {
  if (!body.accountId) {
    res.json({
      status: "error",
      message: "accountId was not specified",
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
