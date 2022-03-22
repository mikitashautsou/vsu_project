import { connectToDB } from "../../common/db.js";
import { DB_NAME, JWT_SECRET } from "../../config/config.js";
import jwt from "jsonwebtoken";
import { decodeJWT } from "../../common/jwt.js";

/**
 * @param {import("express").Request} req
 */
export default async (req, res) => {
  try {
    const {
      headers,
      body,
      params: { accountId },
    } = req;
    if (!accountId) {
      res.json({
        status: "error",
        message: "Account not found",
      });
      return;
    }
    const result = decodeJWT(headers.authorization);
    const { _id, role, accountId: selfAccountId } = result;
    const bankDb = await connectToDB(DB_NAME);

    if (
      accountId !== selfAccountId &&
      role !== "admin"
    ) {
      res.json({
        status: "error",
        message: "Access denied",
      });
      return;
    }

    const { password, ...sanitizedUser } = await bankDb
      .collection("users")
      .findOne({
        accountId,
      });

    res.json({
      status: "ok",
      body: sanitizedUser,
    });
  } catch (e) {
    res.json({ status: "error", message: e.message });
  }
};
