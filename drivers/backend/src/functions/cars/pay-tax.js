import { ObjectId } from "mongodb";
import { createFunc } from "../../common/create-func.js";
import { post } from "../../common/http.js";
import { requirePermissionAtLeast } from "../../common/permissions.js";
import { BANK_SERVICE_URL, TAX_AMOUNT } from "../../config/config.js";
import getDriverServiceAccountId from "../system/getDriverServiceAccountId.js";
import getDriverServiceBankUser from "../system/getDriverServiceBankUser.js";

export default createFunc({
  requiredFields: [],
  isDbNeeded: true,
  isUserNeeded: true,
  funcBody: async ({ params: { carNo }, db, user }) => {
    const car = await db.collection("cars").findOne({
      _id: new ObjectId(carNo),
    });

    if (!car) {
      throw new Error("Car was not found");
    }

    if (car.ownerId.toString() !== user._id) {
      requirePermissionAtLeast(user.role, "policeman");
    }

    const {
      token,
      user: { _id },
    } = await getDriverServiceBankUser();
    const toAccountId = await getDriverServiceAccountId();
    const {
      response: { requestId: transactionNumber },
    } = await post({
      url: `${BANK_SERVICE_URL}/users/${_id}/accounts/${toAccountId}/request`,
      headers: {
        authorization: token,
      },
      body: {
        amount: TAX_AMOUNT,
        description: "Car Tax Payment",
      },
    });

    return {
      message: "Transfer requested for tax",
      transactionNumber,
    };
  },
});
