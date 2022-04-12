import { ObjectId } from "mongodb";
import { createFunc } from "../../common/create-func.js";
import { requirePermissionAtLeast } from "../../common/permissions.js";

export default createFunc({
  isUserNeeded: true,
  isDbNeeded: true,
  requiredFields: [],
  funcBody: async ({ user, body, db, params: { carId } }) => {
    requirePermissionAtLeast(user.role, "policeman");

    await db.collection("cars").updateOne(
      {
        _id: new ObjectId(carId),
      },
      {
        $set: {
          ...body,
        },
      }
    );
  },
});
