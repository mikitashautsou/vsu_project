import { ObjectId } from "mongodb";
import { createFunc as createHandler } from "../../common/create-func.js";
import { requirePermissionAtLeast } from "../../common/permissions.js";

export default createHandler({
  requiredFields: [],
  isUserNeeded: true,
  isDbNeeded: true,
  funcBody: async ({ user, db, params: { accountId, userId, requestId } }) => {
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

    const transaction = await db.collection("transactions").findOne({
      _id: new ObjectId(requestId),
    });

    if (!transaction) {
      throw new Error("Transaction was not found");
    }
    if (transaction.status !== "requested") {
      throw new Error("Request already fulfilled");
    }

    const sourceAccount = await db.collection("accounts").findOne({
      _id: new ObjectId(accountId),
    });

    if (sourceAccount?.balance < transaction.amount) {
      throw new Error("Not enough founds");
    }
    const destinationAccount = await db.collection("accounts").findOne({
      _id: new ObjectId(transaction.toAccountId),
    });

    if (!destinationAccount) {
      throw new Error("Account was not found");
    }

    await db.collection("accounts").updateOne(
      {
        _id: new ObjectId(destinationAccount._id),
      },
      {
        $set: {
          balance: destinationAccount.balance + transaction.amount,
        },
      }
    );

    await db.collection("accounts").updateOne(
      {
        _id: new ObjectId(sourceAccount._id),
      },
      {
        $set: {
          balance: sourceAccount.balance - transaction.amount,
        },
      }
    );

    await db.collection("transactions").updateOne(
      {
        _id: new ObjectId(requestId),
      },
      {
        $set: {
          fromAccountId: sourceAccount._id.toString(),
          date: new Date(),
          status: "completed",
        },
      }
    );

    return {
      status: "ok",
      message: "completed",
    };
  },
});
