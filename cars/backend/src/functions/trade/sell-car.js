import { ObjectId } from "mongodb";
import { createFunc } from "../../common/create-func.js";
import { connectToDB } from "../../common/db.js";
import { decodeJWT } from "../../common/jwt.js";
import { requirePermissionAtLeast } from "../../common/permissions.js";
import { validateBody } from "../../common/validation.js";
import { CAR_STATE } from "../cars/create-car.js";

export const SALE_STATE = {
  NEW: "new",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
};

export default createFunc({
  isDbNeeded: true,
  isUserNeeded: true,
  requiredFields: ["destinationAccountId", "price"],
  funcBody: async ({
    user,
    db,
    params: { carNo },
    body: { destinationAccountId, price },
  }) => {
    const car = await db.collection("cars").findOne({
      _id: new ObjectId(carNo),
    });

    if (car.ownerId !== user._id) {
      requirePermissionAtLeast(user.role, "policeman");
    }

    if (car.state !== CAR_STATE.TAX_PAID) {
      throw new Error("Tax should be paid in the first place");
    }

    await db.collection("sales").insertOne({
      carId: carNo,
      state: SALE_STATE.NEW,
      price,
      destinationAccountId,
      ownerId: user._id,
    });

    await db.collection("cars").updateOne(
      { _id: new ObjectId(carNo) },
      {
        $set: {
          state: CAR_STATE.ON_SALE,
        },
      }
    );

    return "Sale position was created";
  },
});
