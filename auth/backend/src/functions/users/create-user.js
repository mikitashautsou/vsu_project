import { createFunc } from "../../common/create-func.js";
import { requirePermissions } from "../../common/permissions.js";

export default createFunc({
  isDbNeeded: true,
  isUserNeeded: true,
  requiredFields: ["username", "firstName", "lastName", "password", "role"],
  funcBody: async ({ db, user, body }) => {
    requirePermissions(user.role, ["admin", "manager", "accountant"]);

    if (user.role !== "regular") {
      requirePermissions(user.role, ["admin"]);
    }

    const newUser = await db.collection("users").insertOne({
      ...body,
    });
    return newUser;
  },
});
