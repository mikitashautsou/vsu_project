import { ObjectId } from "mongodb";
import { createFunc } from "../../common/create-func.js";
import { requirePermissionAtLeast } from "../../common/permissions.js";

export default createFunc({
  isUserNeeded: true,
  isDbNeeded: true,
  requiredFields: [],
  funcBody: async ({ db, user, params: { poaId }, body }) => {
    if (body.carId) {
      const car = await db.collection("cars").findOne({
        _id: new ObjectId(body.carId),
      });
      if (!car) {
        throw new Error("Car was not found");
      }

      if (car.ownerId !== user._id) {
        requirePermissionAtLeast(user.role, "manager");
      }
    }

    const poa = await db.collection("poas").findOne({
      _id: new ObjectId(poaId),
    });
    if (poa.fromUserId !== user._id) {
      requirePermissionAtLeast("manager");
    }

    await db.collection("poas").updateOne(
      {
        _id: new ObjectId(poaId),
      },
      {
        $set: {
          ...body,
        },
      }
    );
    return "Power of attorney was updated";
  },
});
