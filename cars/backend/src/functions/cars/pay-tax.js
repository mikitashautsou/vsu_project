import { ObjectId } from "mongodb";
import { createFunc } from "../../common/create-func.js";
import { post } from "../../common/http.js";
import { requirePermissionAtLeast } from "../../common/permissions.js";
import { BANK_SERVICE_URL, TAX_AMOUNT } from "../../config/config.js";
import getDriverServiceAccountId from "../system/getCarsServiceAccountId.js";
import getDriverServiceBankUser from "../system/getCarsServiceBankUser.js";
import { CAR_STATE } from "./create-car.js";

export default createFunc({
  requiredFields: ["payerId", "accountId"],
  isDbNeeded: true,
  isUserNeeded: true,
  funcBody: async ({
    params: { carNo },
    db,
    user,
    _req,
    body: { payerId, accountId: payerAccountId },
  }) => {
    const car = await db.collection("cars").findOne({
      _id: new ObjectId(carNo),
    });

    if (car.ownerId !== user._id) {
      requirePermissionAtLeast(user.role, "policeman");
    }
    if (!car) {
      throw new Error("Car was not found");
    }

    if (car.ownerId.toString() !== user._id) {
      requirePermissionAtLeast(user.role, "policeman");
    }

    if (car.state !== CAR_STATE.NEW) {
      throw new Error("Tax already paid");
    }
    console.log("paying...");

    const {
      token,
      user: { _id },
    } = await getDriverServiceBankUser();
    const toAccountId = await getDriverServiceAccountId();

    console.log({ toAccountId });
    const { status } = await post({
      url: `${BANK_SERVICE_URL}/users/${payerId}/accounts/${payerAccountId}/transfer`,
      headers: {
        authorization: _req.headers.authorization,
      },
      body: {
        amount: TAX_AMOUNT,
        destinationAccountId: toAccountId,
        description: "Car Tax Payment",
      },
    });
    console.log({ status });

    console.log("here");

    if (status !== "ok") {
      throw new Error("Payment was not successful");
    }

    console.log("here2");

    await db.collection("cars").updateOne(
      {
        _id: new ObjectId(carNo),
      },
      {
        $set: {
          state: CAR_STATE.TAX_PAID,
        },
      }
    );
    return "Tax paid";
  },
});
