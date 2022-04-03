import { connectToDB } from "../../common/db.js";
import { decodeJWT } from "../../common/jwt.js";
import { validateBody } from "../../common/validation.js";

export const CAR_STATE = {
  NEW: "new",
  TAX_PAID: "tax-paid",
  ON_SALE: "on-sale",
  STOLEN: "stolen",
};
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export default async (req, res) => {
  try {
    const { body, headers } = req;
    const { carNo } = req.params;
    if (!carNo) {
      res.status(400).json({
        status: "error",
        message: "Car no was not provided",
      });
      return;
    }
    const isValid = validateBody(req, res, body, ["targetUserId"]);
    if (!isValid) {
      return;
    }

    const { targetUserId } = body;

    const { _id } = decodeJWT(headers.authorization);
    const db = await connectToDB();
    const car = await db.collection("cars").findOne({
      carNo,
    });
    if (!car) {
      res.status(400).json({
        status: "error",
        message: "Car not found",
      });
      return;
    }
    if (car.ownerId !== _id) {
      res.status(400).json({
        status: "error",
        message: "Access denied",
      });
      return;
    }

    await db.collection("poa").insertOne({
      carNo,
      fromUserId: _id,
      targetUserId,
    });
    res.status(400).json({
      status: "ok",
      message: "Power of attorney was created",
    });
  } catch (e) {
    res.status(400).json({
      status: "error",
      message: e.message,
    });
  }
};
