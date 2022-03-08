const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./config')

const createJWT = (user) => {
    return jwt.sign(user, JWT_SECRET)
}

const decodeJWT = (token) => {
    return jwt.verify(token, JWT_SECRET)
}

module.exports = {
    createJWT,
    decodeJWT
}