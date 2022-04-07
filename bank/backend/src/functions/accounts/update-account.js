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
  funcBody: async ({ user, db, params: { userId, accountId }, body }) => {
    if (body.balance !== undefined) {
      requirePermissionAtLeast(user.role, "accountant");
    }

    if (user._id !== userId) {
      requirePermissionAtLeast(user.role, "accountant");
    }
    await db.collection("accounts").updateOne(
      {
        _id: new ObjectId(accountId),
      },
      {
        $set: {
          ...body,
        },
      }
    );
    return "account updated";
  },
});
