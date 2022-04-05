import jsonwebtoken from "jsonwebtoken";
import { AUTH_SERVICE_URL, JWT_SECRET } from "../config/config.js";
import validateToken from "../functions/token/validate-token.js";
import { post } from "./http.js";

/**
 * @param {import("express").Request} req
 * @returns {Promise<{ _id: string, username: string, firstName: string, lastName: string, password: string, role: string}>} response
 */
export const extractUser = async (req) => {
  try {
    return await jsonwebtoken.verify(req.headers.authorization, JWT_SECRET);
  } catch (e) {
    console.error(e);
    throw new Error("User is not authenticated");
  }
};
