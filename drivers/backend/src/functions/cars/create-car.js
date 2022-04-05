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
  requiredFields: ["model", "carNo", "ownerId"],
  funcBody: async ({ user, body: { model, carNo, ownerId }, db }) => {
    requirePermissionAtLeast(user.role, "policeman");

    await db.collection("cars").insertOne({
      model,
      state: CAR_STATE.NEW,
      carNo,
      taxPaymentTransactionNo: null,
      ownerId,
    });
  },
});
