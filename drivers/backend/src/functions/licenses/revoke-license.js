import { ObjectId } from "bson";
import { createFunc } from "../../common/create-func.js";
import { post } from "../../common/http.js";
import { requirePermissionAtLeast } from "../../common/permissions.js";
import { BANK_SERVICE_URL, TAX_AMOUNT } from "../../config/config.js";
import getDriverServiceAccountId from "../system/getDriverServiceAccountId.js";
import getDriverServiceBankUser from "../system/getDriverServiceBankUser.js";

export default createFunc({
  requiredFields: [],
  isDbNeeded: true,
  isUserNeeded: true,
  funcBody: async ({
    _req,
    user: { role, _id },
    db,
    params: { licenseId },
    body: { untilDate },
  }) => {
    requirePermissionAtLeast(role, "policeman");
    const license = await db
      .collection("licenses")
      .findOne({ _id: new ObjectId(licenseId) });
    if (!license) {
      throw new Error("License was not found");
    }

    if (untilDate) {
      await db.collection("licenses").updateOne(
        {
          _id: new ObjectId(licenseId),
        },
        {
          $set: {
            revokedUntil: untilDate,
          },
        }
      );
    } else {
      await db.collection("licenses").updateOne(
        {
          _id: new ObjectId(licenseId),
        },
        {
          $set: {
            revoked: true,
          },
        }
      );
    }

    return "License revoked";
  },
});
