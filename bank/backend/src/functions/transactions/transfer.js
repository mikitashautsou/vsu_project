import { ObjectId } from "mongodb";
import { createFunc } from "../../common/create-func.js";
import { requirePermissionAtLeast } from "../../common/permissions.js";

export default createFunc({
  isDbNeeded: true,
  isUserNeeded: true,
  requiredFields: ["destinationAccountId", "amount"],
  funcBody: async ({
    user,
    body: { destinationAccountId, amount, description },
    params: { userId, accountId: sourceAccountId },
    db,
  }) => {
    if (userId !== user._id) {
      requirePermissionAtLeast(user.role, "accountant");
    }
    const sourceAccount = await db.collection("accounts").findOne({
      _id: new ObjectId(sourceAccountId),
      userId,
    });

    console.log("source account", sourceAccount);
    if (sourceAccount.balance < amount) {
      throw new Error("Not enough founds");
    }

    const destinationAccount = await db.collection("accounts").findOne({
      _id: new ObjectId(destinationAccountId),
    });

    if (!destinationAccount) {
      throw new Error("Destination account not found");
    }

    sourceAccount.balance -= amount;
    destinationAccount.balance += amount;

    await db.collection("accounts").updateOne(
      {
        _id: sourceAccount._id,
      },
      {
        $set: {
          balance: sourceAccount.balance,
        },
      }
    );
    await db.collection("accounts").updateOne(
      {
        _id: destinationAccount._id,
      },
      {
        $set: {
          balance: destinationAccount.balance,
        },
      }
    );
    await db.collection("transactions").insertOne({
      fromAccountId: sourceAccount._id.toString(),
      toAccountId: destinationAccount._id.toString(),
      amount,
      date: new Date(),
      status: "completed",
      description,
    });
    return "Funds transferred";
  },
});
