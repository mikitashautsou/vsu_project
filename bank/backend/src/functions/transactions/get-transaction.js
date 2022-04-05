import { connectToDB } from "../../common/db.js";
import { DB_NAME, JWT_SECRET } from "../../config/config.js";
import jwt from "jsonwebtoken";
import { decodeJWT } from "../../common/token.js";

/**
 * @param {import("express").Request} req
 */
export default async (req, res) => {
  try {
    const { headers } = req;
    const result = decodeJWT(headers.authorization);
    const { _id, role, accountId } = result;
    const bankDb = await connectToDB(DB_NAME);

    const { transactionNumber } = req.params;

    let transaction = await bankDb.collection("transactions").findOne({
      transactionNumber,
    });
    if (
      transaction.fromAccountId !== accountId &&
      transaction.toAccountId !== accountId &&
      (role === "accountant" || role === "admin")
    ) {
      res.status(400).json({
        status: "error",
        message: "access denied",
      });
      return;
    }
    res.json({
      status: "ok",
      body: transaction,
    });
  } catch (e) {
    res.status(400).json({ status: "error", message: e.message });
  }
};
