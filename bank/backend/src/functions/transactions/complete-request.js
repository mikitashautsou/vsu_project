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

    const { fromAccountId, transferRequestNo } = body;
    const result = decodeJWT(headers.authorization);
    const { _id, role, accountId } = result;
    const bankDb = await connectToDB(DB_NAME);

    let transactions;
    if (
      role !== "accountant" &&
      role !== "admin" &&
      fromAccountId !== accountId
    ) {
      res.status(400).json({
        status: "error",
        message: "Access denied",
      });
      return;
    }

    const requestModel = await bankDb.collection("transactions").findOne({
      transactionNumber: transferRequestNo,
      status: "requested",
    });
    if (!requestModel) {
      res.status(400).json({
        status: "error",
        message: "Transfer request not found",
      });
    }
    const sourceAccount = await bankDb.collection("users").findOne({
      accountId: fromAccountId,
    });

    if (sourceAccount.balance < requestModel.amount) {
      res.status(400).json({
        status: "error",
        message: "Not enough founds",
      });
      return;
    }

    const destinationAccount = await bankDb.collection("users").findOne({
      accountId: requestModel.toAccountId,
    });

    if (!destinationAccount) {
      res.status(400).json({
        status: "error",
        message: "Destination account not found",
      });
      return;
    }

    sourceAccount.balance -= requestModel.amount;
    destinationAccount.balance += requestModel.amount;

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

    await bankDb.collection("transactions").updateOne(
      {
        transactionNumber: requestModel.transactionNumber,
      },
      {
        $set: {
          fromAccountId: fromAccountId,
          date: new Date(),
          initiator: `${sourceAccount.firstName} ${sourceAccount.lastName}`,
          status: "completed",
        },
      }
    );
    res.json({
      status: "ok",
      message: "Transfer request completed",
    });
  } catch (e) {
    res.status(400).json({ status: "error", message: e.message });
  }
};

const validateBody = (req, res, body) => {
  if (!body.fromAccountId) {
    res.status(400).json({
      status: "error",
      message: "Source account id was not specified",
    });
    return false;
  }
  if (!body.transferRequestNo) {
    res.status(400).json({
      status: "error",
      message: "transferRequestNo account id was not specified",
    });
    return false;
  }
  return true;
};
