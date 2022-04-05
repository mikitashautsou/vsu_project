import { connectToDB } from "../../common/db.js";
import { DB_NAME, JWT_SECRET } from "../../config/config.js";
import jwt from "jsonwebtoken";
import { decodeJWT } from "../../common/token.js";

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
      res.status(400).json({
        status: "error",
        message: "Account not found",
      });
      return;
    }
    const result = decodeJWT(headers.authorization);
    const { _id, role } = result;
    const bankDb = await connectToDB(DB_NAME);

    if (role !== "admin") {
      res.status(400).json({
        status: "error",
        message: "Access denied",
      });
      return;
    }

    await bankDb.collection("users").updateOne(
      {
        accountId,
      },
      {
        $set: {
          ...body,
        },
      }
    );

    res.json({
      status: "ok",
    });
  } catch (e) {
    res.status(400).json({ status: "error", message: e.message });
  }
};
