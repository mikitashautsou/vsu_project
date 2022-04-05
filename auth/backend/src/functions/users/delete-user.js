import { ObjectId } from "mongodb";
import { createFunc } from "../../common/create-func.js";
import { requirePermissions } from "../../common/permissions.js";

export default createFunc({
  isDbNeeded: true,
  isUserNeeded: true,
  requiredFields: [],
  funcBody: async ({ db, user, body, params }) => {
    requirePermissions(user.role, ["admin", "manager", "accountant"]);

    const newUser = await db.collection("users").deleteOne({
      _id: new ObjectId(params.userId),
    });
    return newUser;
  },
});
