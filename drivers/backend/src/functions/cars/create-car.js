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
    const isValid = validateBody(req, res, body, ["model", "carNo"]);
    if (!isValid) {
      return;
    }

    const { model, carNo, ownerId } = body;

    const { role } = decodeJWT(headers.authorization);

    if (role !== "policeman" && role !== "admin") {
      res.json({
        status: "error",
        message: "Access denied",
      });
    }

    const db = await connectToDB();
    await db.collection("cars").insertOne({
      model,
      state: CAR_STATE.NEW,
      carNo,
      taxPaymentTransactionNo: undefined,
      ownerId,
    });
    res.json({
      status: "ok",
      message: "Car was created",
    });
  } catch (e) {
    res.json({
      status: "error",
      message: e.message,
    });
  }
};
