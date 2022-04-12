import { createFunc } from "../../common/create-func.js";
import { requirePermissionAtLeast } from "../../common/permissions.js";

export default createFunc({
  requiredFields: ["type", "userId"],
  isDbNeeded: true,
  isUserNeeded: true,
  funcBody: async ({ body: { type, userId }, user: { role }, db }) => {
    requirePermissionAtLeast(role, "policeman");

    await db.collection("licenses").insertOne({
      type,
      examDate: null,
      isExamPassed: false,
      isTaxPaid: false,
      userId,
    });
  },
});
