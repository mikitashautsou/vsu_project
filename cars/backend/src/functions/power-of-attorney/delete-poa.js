import { ObjectId } from "mongodb";
import { createFunc } from "../../common/create-func.js";
import { requirePermissionAtLeast } from "../../common/permissions.js";

export default createFunc({
  isUserNeeded: true,
  isDbNeeded: true,
  requiredFields: [],
  funcBody: async ({ db, user, params: { userId, poaId }, body }) => {
    const poa = await db.collection("poas").findOne({
      _id: new ObjectId(poaId),
    });
    if (poa.fromUserId !== user._id) {
      requirePermissionAtLeast("manager");
    }

    await db.collection("poas").deleteOne({
      _id: new ObjectId(poaId),
    });
    return "Power of attorney was deleted";
  },
});
