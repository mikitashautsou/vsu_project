import { createFunc } from "../../common/create-func.js";

export default createFunc({
  isDbNeeded: true,
  isUserNeeded: true,
  funcBody: async ({ db, user }) => {
    // if (user.role === "regular") {
    //   throw new Error("Access denied");
    // }
    return await db.collection("users").find().toArray();
  },
});
