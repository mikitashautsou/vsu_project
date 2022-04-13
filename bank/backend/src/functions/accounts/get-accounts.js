import { createFunc as createHandler } from "../../common/create-func.js";
import { requirePermissions } from "../../common/permissions.js";

export default createHandler({
  requiredFields: [],
  isUserNeeded: true,
  isDbNeeded: true,
  funcBody: async ({ db, params: { userId } }) => {
    if (userId) {
      return await db
        .collection("accounts")
        .find({
          userId,
        })
        .toArray();
    } else {
      return await db.collection("accounts").find().toArray();
    }
  },
});
