import { createFunc as createHandler } from "../../common/create-func.js";

export default createHandler({
  requiredFields: [],
  isUserNeeded: true,
  isDbNeeded: true,
  funcBody: async ({ user, db }) => {
    db.collection("accounts").insertOne({
      userId: user._id,
      balance: 0,
    });
    return "account created";
  },
});
