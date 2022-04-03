import { ObjectId } from "mongodb";
import fetch from "node-fetch";
import { connectToDB } from "../../common/db.js";
import { decodeJWT } from "../../common/jwt.js";
import {
  BANK_SERVICE_URL,
  DRIVER_SERVICE_BANK_ACCOUNT_ID,
  DRIVER_SERVICE_BANK_TOKEN,
  TAX_AMOUNT,
} from "../../config/config.js";
import { SALE_STATE } from "./sell-car.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export default async (req, res) => {
  try {
    const { saleId } = req.params;
    if (!saleId) {
      res.status(400).json({
        status: "error",
        message: "Sale id was not provided",
      });
      return;
    }

    const { role, _id } = decodeJWT(req.headers.authorization);

    const db = await connectToDB();
    const sale = await db.collection("sales").findOne({
      _id: new ObjectId(saleId),
    });

    if (!sale) {
      res.status(400).json({
        status: "error",
        message: "Sale was not found",
      });
      return;
    }

    const { transactionNumber } = await fetch(`${BANK_SERVICE_URL}/request`, {
      method: "post",
      headers: {
        Authorization: DRIVER_SERVICE_BANK_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        toAccountId: DRIVER_SERVICE_BANK_ACCOUNT_ID,
        amount: sale.price,
      }),
    }).then((res) => res.status(400).json());

    await db.collection("sales").updateOne(
      {
        _id: new ObjectId(saleId),
      },
      {
        $set: {
          saleTransactionNo: transactionNumber,
          newPotentialOwner: _id,
          state: SALE_STATE.IN_PROGRESS,
        },
      }
    );
    res.json({
      status: "ok",
      message: "Transfer requested for sale",
      transactionNumber,
    });
  } catch (e) {
    res.status(400).json({
      status: "error",
      message: e.message,
    });
  }
};
