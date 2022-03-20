import { connectToDB } from "../../common/db.js";
import { decodeJWT } from "../../common/jwt.js";
import { validateBody } from "../../common/validation.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export default async (req, res) => {
  try {
    const result = decodeJWT(req.headers.authorization);
    const { _id: userId, role } = result;

    const db = await connectToDB();
    const sales = await db.collection("sales").find().toArray();
    res.json({
      status: "ok",
      body: sales.map(({ saleTransactionNo, ...sale }) => sale),
    });
  } catch (e) {
    res.json({
      status: "error",
      message: e.message,
    });
  }
};
