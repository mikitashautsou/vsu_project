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

    const { fromAccountId, toAccountId, amount } = body;
    const result = decodeJWT(headers.authorization);
    const { _id, role, accountId } = result;
    const bankDb = await connectToDB(DB_NAME);

    let transactions;
    if (
      role !== "accountant" &&
      role !== "admin" &&
      fromAccountId !== accountId
    ) {
      res.json({
        status: "error",
        message: "Access denied",
      });
      return;
    }

    const sourceAccount = await bankDb.collection("users").findOne({
      accountId: fromAccountId,
    });

    if (sourceAccount.balance < amount) {
      res.json({
        status: "error",
        message: "Not enough founds",
      });
      return;
    }

    const destinationAccount = await bankDb.collection("users").findOne({
      accountId: toAccountId,
    });

    if (!destinationAccount) {
      res.json({
        status: "error",
        message: "Destination account not found",
      });
      return;
    }

    sourceAccount.balance -= amount;
    destinationAccount.balance += amount;

    console.log(destinationAccount);
    await bankDb.collection("users").updateOne(
      {
        _id: sourceAccount._id,
      },
      {
        $set: {
          balance: sourceAccount.balance,
        },
      }
    );
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
    const transactionNumber = generateRandomNumber();
    await bankDb.collection("transactions").insertOne({
      transactionNumber,
      fromAccountId,
      toAccountId,
      amount,
      date: new Date(),
      initiator: `${sourceAccount.firstName} ${sourceAccount.lastName}`,
      status: 'completed'
    });
    res.json({
      status: "ok",
      message: "Funds transferred",
    });
  } catch (e) {
    res.json({ status: "error", message: e.message });
  }
};

const validateBody = (req, res, body) => {
  if (!body.fromAccountId) {
    res.json({
      status: "error",
      message: "Source account id was not specified",
    });
    return false;
  }
  if (!body.toAccountId) {
    res.json({
      status: "error",
      message: "Destination account id was not specified",
    });
    return false;
  }
  if (!body.amount) {
    res.json({
      status: "error",
      message: "Amount was not specified",
    });
    return false;
  }
  return true;
};
