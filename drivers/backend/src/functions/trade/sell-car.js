import { connectToDB } from "../../common/db.js";
import { decodeJWT } from "../../common/jwt.js";
import { validateBody } from "../../common/validation.js";

export const SALE_STATE = {
  NEW: "new",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
};
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export default async (req, res) => {
  try {
    const result = decodeJWT(req.headers.authorization);
    const { _id: userId, role } = result;
    const { body } = req;
    const isValid = validateBody(req, res, body, ["carNo", "price"]);
    if (!isValid) {
      return;
    }

    const { carNo, price } = body;

    const db = await connectToDB();
    const car = await db.collection("cars").findOne({
      carNo,
    });
    if (userId !== car.ownerId && ["admin", "policeman"].includes(role)) {
      res.status(400).json({
        status: "error",
        message: "Access denied",
      });
      return;
    }

    await db.collection("sales").insertOne({
      carNo,
      state: SALE_STATE.NEW,
      price,
      saleTransactionNo: undefined,
      ownerId: userId,
    });

    res.json({
      status: "ok",
      message: "Sale position was created",
    });
  } catch (e) {
    res.status(400).json({
      status: "error",
      message: e.message,
    });
  }
};
