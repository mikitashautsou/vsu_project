import { createFunc } from "../../common/create-func.js";
import { SALE_STATE } from "./sell-car.js";

export default createFunc({
  isDbNeeded: true,
  requiredFields: [],
  funcBody: async ({ db }) => {
    return (
      await db
        .collection("sales")
        .find({
          state: SALE_STATE.NEW,
        })
        .toArray()
    ).map(({ destinationAccountId, ...sale }) => sale);
  },
});
