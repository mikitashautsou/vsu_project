import { JWT_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";

export const decodeJWT = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (e) {
        throw new Error('User is not authenticated')
    }
};
