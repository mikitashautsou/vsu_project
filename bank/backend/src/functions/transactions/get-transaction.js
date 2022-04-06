import { ObjectId } from "mongodb";
import { createFunc } from "../../common/create-func.js";
import { requirePermissionAtLeast } from "../../common/permissions.js";

export default createFunc({
  isDbNeeded: true,
  isUserNeeded: true,
  requiredFields: [],
  funcBody: async ({
    db,
    user,
    params: { userId, accountId, transactionId },
  }) => {
    if (user._id !== userId) {
      requirePermissionAtLeast(user.role, "accountant");
    }
    const account = await db.collection("accounts").findOne({
      _id: new ObjectId(accountId),
    });
    if (!account) {
      throw new Error("Account was not found");
    }
    if (account.userId !== userId) {
      requirePermissionAtLeast(user.role, "accountant");
    }
    console.log({
      transactionId,
      accountId,
    });
    return await db.collection("transactions").findOne({
      _id: new ObjectId(transactionId),
      $or: [
        {
          fromAccountId: accountId,
        },
        {
          toAccountId: accountId,
        },
      ],
    });
  },
});
