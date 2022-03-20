import { connectToDB } from "../../common/db.js";
import { decodeJWT } from "../../common/jwt.js";
import { validateBody } from "../../common/validation.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export default async (req, res) => {
  try {
    const { carNo } = req.params;
    if (!carNo) {
      res.json({
        status: "error",
        message: "Car no was not provided",
      });
      return;
    }
    const { role, _id } = decodeJWT(req.headers.authorization);
    const db = await connectToDB();
    let poas;
    if (role === "driver") {
      poas = await db
        .collection("poa")
        .find({
          carNo,
          $or: [
            {
              fromUserId: _id,
            },
            {
              targetUserId: _id,
            },
          ],
        })
        .toArray();
    } else {
      poas = await db.collection("poa").find({ carNo }).toArray();
    }
    res.json({
      status: "ok",
      body: poas,
    });
  } catch (e) {
    res.json({
      status: "error",
      message: e.message,
    });
  }
};
