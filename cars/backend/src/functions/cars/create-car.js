import { createFunc } from "../../common/create-func.js";
import { requirePermissionAtLeast } from "../../common/permissions.js";

export const CAR_STATE = {
  NEW: "new",
  TAX_PAID: "tax-paid",
  ON_SALE: "on-sale",
  STOLEN: "stolen",
};

export default createFunc({
  isUserNeeded: true,
  isDbNeeded: true,
  requiredFields: ["model", "ownerId"],
  funcBody: async ({ user, body: { model }, db }) => {
    requirePermissionAtLeast(user.role, "policeman");

    await db.collection("cars").insertOne({
      model,
      state: CAR_STATE.NEW,
      ownerId: user._id,
    });
  },
});
