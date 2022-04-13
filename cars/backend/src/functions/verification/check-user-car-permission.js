import { ObjectId } from "mongodb";
import { createFunc } from "../../common/create-func.js";
import { requirePermissionAtLeast } from "../../common/permissions.js";
import { CAR_STATE } from "../cars/create-car.js";

export default createFunc({
  isUserNeeded: true,
  isDbNeeded: true,
  requiredFields: [],
  funcBody: async ({ user, db, params: { userId, carId } }) => {
    const car = await db.collection("cars").findOne({
      _id: new ObjectId(carId),
    });
    if (!car) {
      throw new Error('Car was not found')
    }
    if (car.state === CAR_STATE.NEW) {
      return {
        carAccessPermitted: false,
        description: "Tax not paid",
      };
    }
    if (car.state === CAR_STATE.STOLEN) {
      return {
        carAccessPermitted: false,
        description: "Car was stolen",
      };
    }

    const poaPermit = await db.collection("poas").findOne({
      targetUserId: userId,
      carId,
    });

    if (poaPermit) {
      return {
        carAccessPermitted: true,
        description: "Permitted by power of attorney",
      };
    }

    if (car.ownerId === userId) {
      if (poaPermit) {
        return {
          carAccessPermitted: true,
          description: "Permitted as it's owner of a car",
        };
      }
    }
    return {
      carAccessPermitted: false,
      description: "Car is not owned by this user",
    };
  },
});
