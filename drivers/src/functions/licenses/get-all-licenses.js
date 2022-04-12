import { ObjectId } from "mongodb";
import { createFunc } from "../../common/create-func.js";
import { requirePermissionAtLeast } from "../../common/permissions.js";

export default createFunc({
  isUserNeeded: true,
  isDbNeeded: true,
  requiredFields: [],
  funcBody: async ({ user, db }) => {
    if (user.role === "regular") {
      return await db
        .collection("licenses")
        .find({
          userId: new ObjectId(user._id),
        })
        .toArray();
    } else {
      return await db.collection("licenses").find().toArray();
    }
  },
});
