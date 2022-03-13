import { connectToDB } from "../common/db.js";
import { DB_NAME, JWT_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";
import { decodeJWT } from "../common/jwt.js";

/**
 * @param {import("express").Request} req
 */
export default async (req, res) => {
  try {
    const { headers } = req;
    const result = decodeJWT(headers.authorization);
    const { _id, role, accountId } = result;
    const bankDb = await connectToDB(DB_NAME);

    let transactions;
    if (role === "accountant" || role === "admin") {
      transactions = await bankDb.collection("transactions").find({}).toArray();
    } else {
      transactions = await bankDb
        .collection("transactions")
        .find({
          $or: [
            {
              fromAccountId: accountId,
            },
            {
              toAccountId: accountId,
            },
          ],
        })
        .toArray();
    }

    res.json({
      status: "ok",
      body: transactions,
    });
  } catch (e) {
    res.json({ status: "error", message: e.message });
  }
};
