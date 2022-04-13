import { createFunc as createHandler } from "../../common/create-func.js";
import { requirePermissions } from "../../common/permissions.js";

export default createHandler({
  requiredFields: [],
  isUserNeeded: true,
  isDbNeeded: true,
  funcBody: async ({ db, params: { userId }, user }) => {
    let roleLimitationFilter;
    if (user.role === "regular" || user.role === "policeman") {
      roleLimitationFilter = {
        userId: user._id,
      };
    }
    if (userId) {
      return await db
        .collection("accounts")
        .find({
          userId,
          ...roleLimitationFilter,
        })
        .toArray();
    } else {
      return await db
        .collection("accounts")
        .find({
          ...roleLimitationFilter,
        })
        .toArray();
    }
  },
});
