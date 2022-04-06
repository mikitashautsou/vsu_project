import { ObjectId } from "mongodb";
import { createFunc as createHandler } from "../../common/create-func.js";
import { requirePermissionAtLeast } from "../../common/permissions.js";

export default createHandler({
  requiredFields: ["amount", "description"],
  isUserNeeded: true,
  isDbNeeded: true,
  funcBody: async ({
    user,
    db,
    params: { accountId, userId },
    body: { amount, description },
  }) => {
    if (userId !== user._id) {
      requirePermissionAtLeast(user.role, "manager");
    }

    const account = await db.collection("accounts").findOne({
      _id: new ObjectId(accountId),
      userId,
    });
    if (!account || account.userId !== userId) {
      throw new Error("Account was not found");
    }

    const { insertedId } = await db.collection("transactions").insertOne({
      fromAccountId: null,
      toAccountId: accountId,
      date: null,
      status: "requested",
      amount,
      description,
    });
    return {
      requestId: insertedId,
    };
  },
});
