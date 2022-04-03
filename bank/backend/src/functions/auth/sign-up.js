import { connectToDB } from "../../common/db.js";
import { DB_NAME } from "../../config/config.js";
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
  const newUser = body;
  const db = await connectToDB(DB_NAME);
  const accountId = generateRandomNumber();
  db.collection("users").insertOne({
    ...newUser,
    role: "regular",
    balance: 0,
    accountId,
  });
  res.json({
    status: "ok",
    message: "User was created",
    accountId,
  });
};

const validateBody = (req, res, body) => {
  if (!body.passportNo) {
    res.status(400).json({
      status: "error",
      message: "Passport number was not specified",
    });
    return false;
  }
  if (!body.firstName) {
    res.status(400).json({
      status: "error",
      message: "First name was not specified",
    });
    return false;
  }
  if (!body.lastName) {
    res.status(400).json({
      status: "error",
      message: "Last name was not specified",
    });
    return false;
  }
  if (!body.password) {
    res.status(400).json({
      status: "error",
      message: "Password was not specified",
    });
    return false;
  }
  return true;
};
