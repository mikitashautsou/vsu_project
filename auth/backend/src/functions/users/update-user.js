import { ObjectId } from "mongodb";
import { createFunc } from "../../common/create-func.js";
import { requirePermissions } from "../../common/permissions.js";

export default createFunc({
  isDbNeeded: true,
  isUserNeeded: true,
  requiredFields: [],
  funcBody: async ({ db, user, body, params: { userId } }) => {
    if (userId !== user._id) {
      requirePermissions(user.role, ["admin", "manager"]);
    }

    await db.collection("users").updateOne(
      {
        _id: new ObjectId(userId),
      },
      {
        $set: {
          ...body,
        },
      }
    );
    return "ok";
  },
});
