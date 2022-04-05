import { createFunc as createHandler } from "../../common/create-func.js";
import { requirePermissions } from "../../common/permissions.js";

export default createHandler({
  requiredFields: [],
  isUserNeeded: true,
  isDbNeeded: true,
  funcBody: async ({ user, db, params: { userId } }) => {
    if (user._id !== userId) {
      requirePermissions(user.role, ["admin", "accountant"]);
    }
    return await db
      .collection("accounts")
      .find({
        userId,
        balance: 0,
      })
      .toArray();
  },
});
