const bcrypt = require("bcryptjs")

const codifyPass = (password) => {
    const SALT = bcrypt.genSaltSync(10, "zaqwsx")
    return bcrypt.hashSync(password, SALT)
} 

const verifyPass = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

module.exports = { codifyPass, verifyPass }