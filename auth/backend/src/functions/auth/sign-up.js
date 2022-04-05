import { connectToDB } from "../../common/db.js";
import { DB_NAME } from "../../config/config.js";
import { validateBody } from "../../common/validation.js";

/**
 * @param {import("express").Request} req
 */
export default async (req, res) => {
  try {
    const { body } = req;
    validateBody(req, ["username", "firstName", "lastName", "password"]);

    const newUser = body;
    const db = await connectToDB(DB_NAME);
    const existingUser = await db.collection("users").findOne({
      username: body.username,
    });
    if (existingUser) {
      res.status(400).json({
        status: "error",
        message: "User with given username already exists",
      });
      return;
    }
    await db.collection("users").insertOne({
      ...newUser,
      role: "regular",
    });
    res.json({
      status: "ok",
      message: "User was created",
    });
  } catch (e) {
    res.status(400).json({
      status: "error",
      message: e.message,
    });
  }
};

// const validateBody = (req, res, body) => {
//   if (!body.passportNo) {
//     res.status(400).json({
//       status: "error",
//       message: "Passport number was not specified",
//     });
//     return false;
//   }
//   if (!body.firstName) {
//     res.status(400).json({
//       status: "error",
//       message: "First name was not specified",
//     });
//     return false;
//   }
//   if (!body.lastName) {
//     res.status(400).json({
//       status: "error",
//       message: "Last name was not specified",
//     });
//     return false;
//   }
//   if (!body.password) {
//     res.status(400).json({
//       status: "error",
//       message: "Password was not specified",
//     });
//     return false;
//   }
//   return true;
// };
