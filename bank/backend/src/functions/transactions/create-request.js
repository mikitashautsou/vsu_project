import { connectToDB, getMongoClient } from "../../common/db.js";
import { DB_NAME, JWT_SECRET } from "../../config/config.js";
import jwt from "jsonwebtoken";
import { decodeJWT } from "../../common/token.js";
import { ObjectId } from "mongodb";
import { generateRandomNumber } from "../../common/num.js";

/**
 * @param {import("express").Request} req
 */
export default async (req, res) => {
  try {
    const { headers, body } = req;
    const isValid = validateBody(req, res, body);
    if (!isValid) {
      return;
    }

    const { toAccountId, amount } = body;
    const { _id, role, accountId } = decodeJWT(headers.authorization);
    const bankDb = await connectToDB(DB_NAME);

    let transactions;
    if (
      role !== "accountant" &&
      role !== "admin" &&
      toAccountId !== accountId
    ) {
      res.status(400).json({
        status: "error",
        message: "Access denied",
      });
      return;
    }
    const destinationAccount = await bankDb.collection("users").findOne({
      accountId: toAccountId,
    });

    if (!destinationAccount) {
      res.status(400).json({
        status: "error",
        message: "Destination account not found",
      });
      return;
    }

    const transactionNumber = generateRandomNumber();
    await bankDb.collection("transactions").insertOne({
      transactionNumber,
      fromAccountId: undefined,
      toAccountId,
      amount,
      date: undefined,
      initiator: undefined,
      status: "requested",
    });
    res.json({
      status: "ok",
      message: "Transaction requested",
      transactionNumber,
    });
  } catch (e) {
    res.status(400).json({ status: "error", message: e.message });
  }
};

const validateBody = (req, res, body) => {
  if (!body.toAccountId) {
    res.status(400).json({
      status: "error",
      message: "Destination account id was not specified",
    });
    return false;
  }
  if (!body.amount) {
    res.status(400).json({
      status: "error",
      message: "Amount was not specified",
    });
    return false;
  }
  return true;
};
