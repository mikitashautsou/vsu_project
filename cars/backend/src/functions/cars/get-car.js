import { ObjectId } from "mongodb";
import { createFunc } from "../../common/create-func.js";
import { connectToDB } from "../../common/db.js";
import { decodeJWT } from "../../common/jwt.js";
import {
  hasRoleAtLeast,
  requirePermissionAtLeast,
} from "../../common/permissions.js";
import { validateBody } from "../../common/validation.js";

export default createFunc({
  requiredFields: [],
  isDbNeeded: true,
  isUserNeeded: true,
  funcBody: async ({ user, db, params: { carId } }) => {
    const car = await db.collection("cars").findOne({
      _id: new ObjectId(carId),
    });
    if (car.ownerId !== user._id) {
      requirePermissionAtLeast(user.role, "policeman");
    }
    return car;
  },
});
