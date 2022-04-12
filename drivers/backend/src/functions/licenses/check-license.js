import { ObjectId } from "bson";
import { createFunc } from "../../common/create-func.js";

export default createFunc({
  requiredFields: [],
  isDbNeeded: true,
  isUserNeeded: true,
  funcBody: async ({ _req, db, params: { userId } }) => {
    const license = await db.collection("licenses").findOne({ userId });
    if (!license) {
      return {
        valid: false,
      };
    }
    return {
      valid:
        license.isTaxPaid &&
        license.isExamPassed &&
        !license.revoked &&
        (!license.revokedUntil || license.revokedUntil < Date.now()),
    };
  },
});
