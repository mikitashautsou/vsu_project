import { ObjectId } from "mongodb";
import { createFunc } from "../../common/create-func.js";
import {
  hasRoleAtLeast,
  requirePermissionAtLeast,
} from "../../common/permissions.js";

export default createFunc({
  isUserNeeded: true,
  isDbNeeded: true,
  requiredFields: [],
  funcBody: async ({ user, db }) => {
    if (hasRoleAtLeast(user.role, "policeman")) {
      return await db.collection("poas").find().toArray();
    } else {
      return await db
        .collection("poas")
        .find({
          $or: [
            {
              fromUserId: user._id,
            },
            {
              targetUserId: user._id,
            },
          ],
        })
        .toArray();
    }
  },
});
