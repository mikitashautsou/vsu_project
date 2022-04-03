import fetch from "node-fetch";
import { connectToDB } from "../../common/db.js";
import { decodeJWT } from "../../common/jwt.js";
import {
  BANK_SERVICE_URL,
  DRIVER_SERVICE_BANK_ACCOUNT_ID,
  DRIVER_SERVICE_BANK_TOKEN,
  TAX_AMOUNT,
} from "../../config/config.js";
import { CAR_STATE } from "./create-car.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export default async (req, res) => {
  try {
    const { role, _id } = decodeJWT(req.headers.authorization);

    const { carNo } = req.params;
    if (!carNo) {
      res.status(400).json({
        status: "error",
        message: "Car no was not provided",
      });
      return;
    }
    const db = await connectToDB();
    const car = await db.collection("cars").findOne({
      carNo,
    });

    if (!car) {
      res.status(400).json({
        status: "error",
        message: "Car was not found",
      });
      return;
    }

    if (car.ownerId !== _id && !["admin", "policeman"].includes(role)) {
      res.status(400).json({
        status: "error",
        message: "Access denied",
      });
      return;
    }
    if (!car.taxPaymentTransactionNo) {
      res.status(400).json({
        status: "error",
        message: "Tax payment was not requested yet",
      });
      return;
    }
    const {
      body: { status },
    } = await fetch(
      `${BANK_SERVICE_URL}/transactions/${car.taxPaymentTransactionNo}`,
      {
        method: "get",
        headers: {
          Authorization: DRIVER_SERVICE_BANK_TOKEN,
        },
      }
    ).then((res) => res.status(400).json());

    if (status !== "completed") {
      res.status(400).json({
        status: "error",
        message: "Tax payment was not paid yet",
      });
      return;
    }

    await db.collection("cars").updateOne(
      {
        carNo,
      },
      {
        $set: {
          state: CAR_STATE.TAX_PAID,
        },
      }
    );
    res.json({
      status: "ok",
      message: "Tax payment verified",
    });
  } catch (e) {
    res.status(400).json({
      status: "error",
      message: e.message,
    });
  }
};
