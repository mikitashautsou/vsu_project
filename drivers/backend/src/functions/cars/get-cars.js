import { connectToDB } from "../../common/db.js";
import { decodeJWT } from "../../common/jwt.js";
import { validateBody } from "../../common/validation.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export default async (req, res) => {
  try {
    const { role, _id } = decodeJWT(req.headers.authorization);
    const db = await connectToDB();
    let cars;
    if (role === "driver") {
      cars = await db
        .collection("cars")
        .find({
          ownerId: _id,
        })
        .toArray();
    } else {
      cars = await db.collection("cars").find().toArray();
    }
    res.json({
      status: "ok",
      body: cars.map(({ taxPaymentTransactionNo, ...car }) => car),
    });
  } catch (e) {
    res.status(400).json({
      status: "error",
      message: e.message,
    });
  }
};
