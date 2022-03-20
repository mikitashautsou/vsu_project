import { connectToDB } from "../../common/db.js";
import { DB_NAME } from "../../config/config.js";
import { generateRandomNumber } from "../../common/num.js";
import { decodeJWT } from "../../common/jwt.js";

/**
 * @param {import("express").Request} req
 */
export default async (req, res) => {
  const { headers } = req;
  const { role } = decodeJWT(headers.authorization);
  if (role !== "accountant" && role !== "admin") {
    res.json({
      status: "error",
      message: "Access denied",
    });
    return;
  }

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
    accountId,
  });
  res.json({
    status: "ok",
    message: "User was created",
    accountId,
  });
};

const validateBody = (req, res, body) => {
  if (!body.passportNumber) {
    res.json({
      status: "error",
      message: "Passport number was not specified",
    });
    return false;
  }
  if (!body.firstName) {
    res.json({
      status: "error",
      message: "First name was not specified",
    });
    return false;
  }
  if (!body.lastName) {
    res.json({
      status: "error",
      message: "Last name was not specified",
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
  if (!body.balance) {
    res.json({
      status: "error",
      message: "Balance was not specified",
    });
    return false;
  }
  if (!body.role) {
    res.json({
      status: "error",
      message: "Role was not specified",
    });
    return false;
  }
  return true;
};
