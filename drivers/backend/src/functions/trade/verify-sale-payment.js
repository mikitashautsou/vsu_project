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
    const { role, _id } = decodeJWT(req.headers.authorization);

    const { saleId } = req.params;
    if (!saleId) {
      res.json({
        status: "error",
        message: "Sale id was not provided",
      });
      return;
    }
    const db = await connectToDB();
    const sale = await db.collection("sales").findOne({
      _id: new ObjectId(saleId),
    });

    if (!sale) {
      res.json({
        status: "error",
        message: "Sale was not found",
      });
      return;
    }

    if (!sale.saleTransactionNo) {
      res.json({
        status: "error",
        message: "Sale payment was not requested yet",
      });
      return;
    }

    const owner = await db.collection("users").findOne({
      _id: new ObjectId(sale.ownerId),
    });
    const {
      body: { status,  },
    } = await fetch(
      `${BANK_SERVICE_URL}/transactions/${sale.saleTransactionNo}`,
      {
        method: "get",
        headers: {
          Authorization: DRIVER_SERVICE_BANK_TOKEN,
        },
      }
    ).then((res) => res.json());

    if (status !== "completed") {
      res.json({
        status: "error",
        message: "Sale payment was not paid yet",
      });
      return;
    }

    await fetch(`${BANK_SERVICE_URL}/transfer`, {
      method: "post",
      headers: {
        Authorization: DRIVER_SERVICE_BANK_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fromAccountId: DRIVER_SERVICE_BANK_ACCOUNT_ID,
        toAccountId: owner.bankAccountId,
        amount: sale.price,
      }),
    }).then((res) => res.json());

    await db.collection("sales").updateOne(
      {
        _id: new ObjectId(saleId),
      },
      {
        $set: {
          state: SALE_STATE.COMPLETED,
        },
      }
    );
    await db.collection("cars").updateOne(
        {
          carNo: sale.carNo,
        },
        {
          $set: {
            ownerId: sale.newPotentialOwner,
          },
        }
      );
    res.json({
      status: "ok",
      message: "Payment verified",
    });
  } catch (e) {
    res.json({
      status: "error",
      message: e.message,
    });
  }
};
