import { connectToDB, getMongoClient } from "../../common/db.js";
import { DB_NAME, JWT_SECRET } from "../../config/config.js";
import jwt from "jsonwebtoken";
import { decodeJWT } from "../../common/jwt.js";
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

    const { accountId, amount } = body;
    const result = decodeJWT(headers.authorization);
    const { _id, role } = result;
    const bankDb = await connectToDB(DB_NAME);

    let transactions;
    if (role !== "accountant" && role !== "admin") {
      res.status(400).json({
        status: "error",
        message: "Access denied",
      });
      return;
    }
    const destinationAccount = await bankDb.collection("users").findOne({
      accountId,
    });

    if (!destinationAccount) {
      res.status(400).json({
        status: "error",
        message: "Destination account not found",
      });
      return;
    }

    destinationAccount.balance += amount;

    await bankDb.collection("users").updateOne(
      {
        _id: destinationAccount._id,
      },
      {
        $set: {
          balance: destinationAccount.balance,
        },
      }
    );
    res.json({
      status: "ok",
      message: "Funds deposited",
    });
  } catch (e) {
    res.status(400).json({ status: "error", message: e.message });
  }
};

const validateBody = (req, res, body) => {
  if (!body.accountId) {
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
