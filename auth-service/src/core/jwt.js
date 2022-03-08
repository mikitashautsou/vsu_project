import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './config.js'

export const createJWT = (user) => {
    return jwt.sign(user, JWT_SECRET)
}

export const decodeJWT = (token) => {
    return jwt.verify(token, JWT_SECRET)
}
