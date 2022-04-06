import { createFunc } from "../../common/create-func.js";
import { connectToDB } from "../../common/db.js";
import { decodeJWT } from "../../common/jwt.js";
import { requirePermissionAtLeast } from "../../common/permissions.js";
import { validateBody } from "../../common/validation.js";

export default createFunc({
  requiredFields: [],
  isDbNeeded: true,
  isUserNeeded: true,
  funcBody: async ({ user, db, params: { userId } }) => {
    if (userId !== user._id) {

      requirePermissionAtLeast(user.role, "policeman");
    }

    const cars = await db
      .collection("cars")
      .find({
        ownerId: userId,
      })
      .toArray();
    return cars.map(({ taxPaymentTransactionNo, ...car }) => car);
  },
});
