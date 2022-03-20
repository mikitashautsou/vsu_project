import fetch from "node-fetch";
import { connectToDB } from "../../common/db.js";
import { decodeJWT } from "../../common/jwt.js";
import {
  BANK_SERVICE_URL,
  DRIVER_SERVICE_BANK_ACCOUNT_ID,
  DRIVER_SERVICE_BANK_TOKEN,
  TAX_AMOUNT,
} from "../../config/config.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export default async (req, res) => {
  try {
    const { carNo } = req.params;
    if (!carNo) {
      res.json({
        status: "error",
        message: "Car no was not provided",
      });
      return;
    }

    const { role, _id } = decodeJWT(req.headers.authorization);

    const db = await connectToDB();
    const car = await db.collection("cars").findOne({
      carNo,
    });

    if (!car) {
      res.json({
        status: "error",
        message: "Car was not found",
      });
      return;
    }

    if (
      role !== "policeman" &&
      role !== "admin" &&
      car.ownerId.toString() !== _id
    ) {
      res.json({
        status: "error",
        message: "Access denied",
      });
    }

    const { transactionNumber } = await fetch(`${BANK_SERVICE_URL}/request`, {
      method: "post",
      headers: {
        Authorization: DRIVER_SERVICE_BANK_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        toAccountId: DRIVER_SERVICE_BANK_ACCOUNT_ID,
        amount: TAX_AMOUNT,
      }),
    }).then((res) => res.json());
    await db.collection("cars").updateOne(
      {
        carNo,
      },
      {
        $set: {
          taxPaymentTransactionNo: transactionNumber,
        },
      }
    );
    res.json({
      status: "ok",
      message: "Transfer requested for tax",
      transactionNumber,
    });
  } catch (e) {
    res.json({
      status: "error",
      message: e.message,
    });
  }
};
