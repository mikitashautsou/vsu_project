import { ObjectId } from "mongodb";
import { createFunc } from "../../common/create-func.js";
import { requirePermissionAtLeast } from "../../common/permissions.js";
import { CAR_STATE } from "../cars/create-car.js";

export default createFunc({
  isUserNeeded: true,
  isDbNeeded: true,
  requiredFields: [],
  funcBody: async ({ db, user, params: { userId, saleId }, body }) => {
    const sale = await db.collection("sales").findOne({
      _id: new ObjectId(saleId),
    });

    if (sale.ownerId !== user._id) {
      requirePermissionAtLeast(user.role, "manager");
    }
    await db.collection("cars").updateOne(
      { _id: new ObjectId(sale.carId) },
      {
        $set: {
          state: CAR_STATE.TAX_PAID,
        },
      }
    );

    await db.collection("sales").deleteOne({
      _id: new ObjectId(saleId),
    });

    return "Car sale was deleted";
  },
});
