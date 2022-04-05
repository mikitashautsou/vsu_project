import { Db } from "mongodb";
import { DB_NAME } from "../config/config.js";
import { connectToDB } from "./db.js";
import { extractUser } from "./token.js";
import { validateBody } from "./validation.js";

/**
 * @param {{ isDbNeeded?: boolean,isUserNeeded?: boolean, funcBody: (params: { params: any, _req: import("express").Request, _res: import("express").Response, body: any, user: { _id: string, username: string, firstName: string, lastName: string, password: string, role: string}, db: Db }) => any, requiredFields: string[] } } config
 */
export const createFunc =
  ({
    funcBody,
    requiredFields = [],
    isUserNeeded = false,
    isDbNeeded = false,
  }) =>
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async (req, res) => {
    try {
      validateBody(req, requiredFields);
      let user;
      if (isUserNeeded) {
        user = await extractUser(req);
      }
      let db;
      if (isDbNeeded) {
        db = await connectToDB(DB_NAME);
      }
      const response = await funcBody({
        _req: req,
        _res: res,
        body: req.body,
        params: req.params,
        user,
        db,
      });
      res.json({
        status: "ok",
        response: response,
      });
    } catch (e) {
      res.status(400).json({
        status: "error",
        message: e.message,
      });
    }
  };
