import { ObjectId } from "mongodb";
import { createFunc } from "../../common/create-func.js";
import { requirePermissions } from "../../common/permissions.js";

export default createFunc({
  isDbNeeded: true,
  isUserNeeded: true,
  funcBody: async ({ db, user, params }) => {
    if (user._id !== params.userId) {
      requirePermissions(user.role, ["admin", "accountant", "manager"]);
    }
    return (
      await db
        .collection("users")
        .find({
          _id: new ObjectId(user._id),
        })
        .toArray()
    )[0];
  },
});
