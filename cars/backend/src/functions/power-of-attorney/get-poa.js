import { ObjectId } from "mongodb";
import { createFunc } from "../../common/create-func.js";
import { requirePermissionAtLeast } from "../../common/permissions.js";

export default createFunc({
  isUserNeeded: true,
  isDbNeeded: true,
  requiredFields: [],
  funcBody: async ({ user, db, params: { poaId } }) => {
    const poa = await db.collection("poas").findOne({
      _id: new ObjectId(poaId),
    });
    if (user._id !== poa.targetUserId && user._id !== poa.fromUserId) {
      requirePermissionAtLeast(user.role, "policeman");
    }
    return await db.collection("poas").findOne({
      _id: new ObjectId(poaId),
    });
  },
});
