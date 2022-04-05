import { connectToDB } from "../../common/db.js";
import { DB_NAME, JWT_SECRET } from "../../config/config.js";
import { validateBody } from "../../common/validation.js";
import jsonwebtoken from "jsonwebtoken";

/**
 * @param {import("express").Request} req
 */
export default async (req, res) => {
  const { body } = req;
  validateBody(req, ["token"]);
  try {
    const result = await jsonwebtoken.verify(body.token, JWT_SECRET);
    res.json({
      status: "ok",
      body: result,
    });
  } catch (e) {
    res.status(400).json({
      status: "error",
      message: "invalid token",
    });
  }
};
