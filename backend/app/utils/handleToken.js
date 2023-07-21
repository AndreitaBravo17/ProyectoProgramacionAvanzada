const jwt = require("jsonwebtoken")
const SECRET = process.env.SECRET || 'R5t6YUj65yU'

const createToken = (data) => {
  return jwt.sign(data, SECRET)
}

const verifyValidToken = (token) => {
  return jwt.verify(token, SECRET)
}

module.exports = { createToken, verifyValidToken }