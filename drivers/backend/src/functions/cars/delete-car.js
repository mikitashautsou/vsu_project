import { ObjectId } from "mongodb";
import { createFunc as createHandler } from "../../common/create-func.js";
import {
  requirePermissionAtLeast,
  requirePermissions,
} from "../../common/permissions.js";

export default createHandler({
  requiredFields: [],
  isUserNeeded: true,
  isDbNeeded: true,
  funcBody: async ({ user, db, params: { userId, carId } }) => {
    if (user._id !== userId) {
      requirePermissionAtLeast(user.role, "policeman");
    }
    await db.collection("cars").deleteOne({
      _id: new ObjectId(carId),
    });
    return "car deleted";
  },
});
