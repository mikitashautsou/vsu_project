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
  funcBody: async ({ user, db, params: { userId, accountId } }) => {
    if (user._id !== userId) {
      requirePermissionAtLeast(user.role, "accountant");
    }
    await db.collection("accounts").deleteOne({
      _id: new ObjectId(accountId),
    });
    return "account deleted";
  },
});
