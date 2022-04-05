import { createFunc as createHandler } from "../../common/create-func.js";
import {
  requirePermissionAtLeast,
  requirePermissions,
} from "../../common/permissions.js";

export default createHandler({
  requiredFields: [],
  isUserNeeded: true,
  isDbNeeded: true,
  funcBody: async ({ user, db }) => {
    requirePermissionAtLeast(user.role, ["accountant"]);
    return await db.collection("accounts").find().toArray();
  },
});
