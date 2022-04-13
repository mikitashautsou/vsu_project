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
  funcBody: async ({ user, db }) => {
    if (hasRoleAtLeast(user.role, "policeman")) {
      const cars = await db.collection("cars").find().toArray();
      return cars.map(({ taxPaymentTransactionNo, ...car }) => car);
    } else {
      const cars = await db
        .collection("cars")
        .find({
          ownerId: user._id,
        })
        .toArray();
      return cars.map(({ taxPaymentTransactionNo, ...car }) => car);
    }
  },
});
