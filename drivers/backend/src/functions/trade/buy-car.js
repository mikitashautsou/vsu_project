import { ObjectId } from "mongodb";
import fetch from "node-fetch";
import { createFunc } from "../../common/create-func.js";
import { connectToDB } from "../../common/db.js";
import { post } from "../../common/http.js";
import { decodeJWT } from "../../common/jwt.js";
import {
  BANK_SERVICE_URL,
  DRIVER_SERVICE_BANK_ACCOUNT_ID,
  DRIVER_SERVICE_BANK_TOKEN,
} from "../../config/config.js";
import { CAR_STATE } from "../cars/create-car.js";
import { SALE_STATE } from "./sell-car.js";

export default createFunc({
  requiredFields: ["payerId", "accountId"],
  isDbNeeded: true,
  isUserNeeded: true,
  funcBody: async ({
    params: { saleId },
    db,
    user,
    _req,
    body: { payerId, accountId: payerAccountId },
  }) => {
    const sale = await db.collection("sales").findOne({
      _id: new ObjectId(saleId),
    });

    const car = await db.collection("cars").findOne({
      _id: new ObjectId(sale.carId),
    });

    if (!car) {
      throw new Error("Car was not found");
    }
    if (car.state !== CAR_STATE.ON_SALE) {
      throw new Error("Car is not on sale");
    }

    const { status } = await post({
      url: `${BANK_SERVICE_URL}/users/${payerId}/accounts/${payerAccountId}/transfer`,
      headers: {
        authorization: _req.headers.authorization,
      },
      body: {
        amount: sale.price,
        destinationAccountId: sale.destinationAccountId,
        description: "Car Sale Payment",
      },
    });
    if (status !== "ok") {
      throw new Error("Payment was not successful");
    }

    await db.collection("cars").updateOne(
      {
        _id: new ObjectId(car._id),
      },
      {
        $set: {
          state: CAR_STATE.TAX_PAID,
          ownerId: payerId,
        },
      }
    );
    await db.collection("sales").updateOne(
      {
        _id: new ObjectId(sale._id),
      },
      {
        $set: {
          state: SALE_STATE.COMPLETED,
        },
      }
    );
    return "Car was bought";
  },
});
