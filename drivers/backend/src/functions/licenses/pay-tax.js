import { ObjectId } from "bson";
import { createFunc } from "../../common/create-func.js";
import { post } from "../../common/http.js";
import { requirePermissionAtLeast } from "../../common/permissions.js";
import { BANK_SERVICE_URL, TAX_AMOUNT } from "../../config/config.js";
import getDriverServiceAccountId from "../system/getDriverServiceAccountId.js";
import getDriverServiceBankUser from "../system/getDriverServiceBankUser.js";

export default createFunc({
  requiredFields: ["payerId", "payerAccountId"],
  isDbNeeded: true,
  isUserNeeded: true,
  funcBody: async ({
    _req,
    user: { role, _id },
    db,
    params: { licenseId },
    body: { payerId, payerAccountId },
  }) => {
    const license = await db
      .collection("licenses")
      .findOne({ _id: new ObjectId(licenseId) });
    if (!license) {
      throw new Error("License was not found");
    }
    if (license.isTaxPaid) {
      throw new Error("Tax already paid");
    }

    if (license.userId !== _id) {
      requirePermissionAtLeast(role, "policeman");
    }
    const toAccountId = await getDriverServiceAccountId();

    const { status } = await post({
      url: `${BANK_SERVICE_URL}/users/${payerId}/accounts/${payerAccountId}/transfer`,
      headers: {
        authorization: _req.headers.authorization,
      },
      body: {
        amount: TAX_AMOUNT,
        destinationAccountId: toAccountId,
        description: "License Tax Payment",
      },
    });
    if (status !== "ok") {
      throw new Error("Payment was not successful");
    }

    await db.collection("licenses").updateOne(
      {
        _id: new ObjectId(licenseId),
      },
      {
        $set: {
          isTaxPaid: true,
        },
      }
    );
    return "License paid successfully";
  },
});
