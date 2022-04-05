import { createFunc } from "../../common/create-func.js";

export default createFunc({
  isDbNeeded: true,
  funcBody: async ({ db }) => {
    return await db.collection("users").find().toArray();
  },
});
