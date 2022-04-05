import { AUTH_SERVICE_URL } from "../config/config.js";
import { post } from "./http.js";

/**
 * @param {import("express").Request} req
 * @returns {Promise<{ _id: string, username: string, firstName: string, lastName: string, password: string, role: string}>} response
 */
export const extractUser = async (req) => {
  try {
    const { body } = await post({
      body: {
        token: req.headers.authorization,
      },
      url: `${AUTH_SERVICE_URL}/token/validate`,
    });
    return body;
  } catch (e) {
    console.error(e);
    throw new Error("User is not authenticated");
  }
};
