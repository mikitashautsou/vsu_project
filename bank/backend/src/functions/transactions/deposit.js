import { ObjectId } from "mongodb";
import { createFunc as createHandler } from "../../common/create-func.js";
import {
  requirePermissionAtLeast,
  requirePermissions,
} from "../../common/permissions.js";

export default createHandler({
  requiredFields: ["amount"],
  isUserNeeded: true,
  isDbNeeded: true,
  funcBody: async ({
    user,
    db,
    params: { accountId, userId },
    body: { amount },
  }) => {
    requirePermissionAtLeast(user.role, "manager");

    const account = await db.collection("accounts").findOne({
      _id: new ObjectId(accountId),
    });
    if (!account) {
      throw new Error("Account was not found");
    }

    await db.collection("accounts").updateOne(
      {
        _id: new ObjectId(accountId),
      },
      {
        $set: {
          balance: account.balance + amount,
        },
      }
    );
    return "Funds deposited";
  },
});
