import { ObjectId } from "mongodb";
import { createFunc } from "../../common/create-func.js";
import { requirePermissionAtLeast } from "../../common/permissions.js";

export default createFunc({
  isUserNeeded: true,
  isDbNeeded: true,
  requiredFields: [],
  funcBody: async ({ db, user, params: { licenseId } }) => {
    requirePermissionAtLeast(user.role, "policeman");
    await db.collection("licenses").deleteOne({
      _id: new ObjectId(licenseId),
    });
    return "License was deleted";
  },
});
