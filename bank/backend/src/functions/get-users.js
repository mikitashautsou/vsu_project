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
    const { _id, role } = result;
    const bankDb = await connectToDB(DB_NAME);

    if (role !== "accountant" && role !== "admin") {
      res.json({
        status: "error",
        message: "Access denied",
      });
      return;
    }

    const users = await bankDb.collection("users").find().toArray();

    res.json({
      status: "ok",
      body: users,
    });
  } catch (e) {
    res.json({ status: "error", message: e.message });
  }
};
