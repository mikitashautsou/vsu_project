import { ObjectId } from "mongodb";
import { connectToDB } from "../../common/db.js";
import { decodeJWT } from "../../common/jwt.js";
import { validateBody } from "../../common/validation.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export default async (req, res) => {
  try {
    const { carNo, poaId } = req.params;
    if (!carNo) {
      res.status(400).json({
        status: "error",
        message: "Car no was not provided",
      });
      return;
    }
    if (!poaId) {
      res.status(400).json({
        status: "error",
        message: "POA Id no was not provided",
      });
      return;
    }
    const { role, _id } = decodeJWT(req.headers.authorization);
    const db = await connectToDB();
    let poa = await db
      .collection("poa")
      .findOne({ _id: new ObjectId(poaId), carNo });
    if (!poa) {
      res.status(400).json({
        status: "error",
        message: "POA not found",
      });
      return;
    }
    if (poa.fromUserId !== _id) {
      res.status(400).json({
        status: "error",
        message: "Access denied",
      });
      return;
    }

    await db.collection("poa").deleteOne({
      _id: new ObjectId(poaId),
    });
    res.json({
      status: "ok",
    });
  } catch (e) {
    res.status(400).json({
      status: "error",
      message: e.message,
    });
  }
};
