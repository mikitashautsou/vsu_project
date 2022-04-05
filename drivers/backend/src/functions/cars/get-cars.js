import { createFunc } from "../../common/create-func.js";
import { connectToDB } from "../../common/db.js";
import { decodeJWT } from "../../common/jwt.js";
import { validateBody } from "../../common/validation.js";

export default createFunc({
  requiredFields: [],
  isDbNeeded: true,
  isUserNeeded: true,
  funcBody: async ({ user, db }) => {
    let cars;
    if (user.role === "regular") {
      cars = await db
        .collection("cars")
        .find({
          ownerId: user._id,
        })
        .toArray();
    } else {
      cars = await db.collection("cars").find().toArray();
    }
    return cars.map(({ taxPaymentTransactionNo, ...car }) => car);
  },
});
