import { ObjectId } from "mongodb";
import { createFunc } from "../../common/create-func.js";
import { requirePermissionAtLeast } from "../../common/permissions.js";

export default createFunc({
  isUserNeeded: true,
  isDbNeeded: true,
  requiredFields: [],
  funcBody: async ({ db, user, params: { licenseId }, body }) => {
    requirePermissionAtLeast(user.role, "policeman");

    await db.collection("licenses").updateOne(
      {
        _id: new ObjectId(licenseId),
      },
      {
        $set: {
          ...body,
        },
      }
    );
    return "License was updated";
  },
});
