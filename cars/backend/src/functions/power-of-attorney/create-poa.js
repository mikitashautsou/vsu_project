import { ObjectId } from "mongodb";
import { createFunc } from "../../common/create-func.js";
import { requirePermissionAtLeast } from "../../common/permissions.js";

export default createFunc({
  isUserNeeded: true,
  isDbNeeded: true,
  requiredFields: ["fromUserId", "targetUserId", "carId"],
  funcBody: async ({
    db,
    user,
    body: { targetUserId, carId, fromUserId },
  }) => {
    const car = await db.collection("cars").findOne({
      _id: new ObjectId(carId),
    });
    if (!car) {
      throw new Error("Car was not found");
    }

    if (car.ownerId !== fromUserId) {
      requirePermissionAtLeast(user.role, "manager");
    }

    await db.collection("poas").insertOne({
      fromUserId,
      carId,
      targetUserId,
    });
    return "Poa was created";
  },
});
