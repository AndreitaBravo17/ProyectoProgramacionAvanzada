const { hasAuthorization} = require('../utils/validateAuth')
const { verifyValidToken } = require('../utils/handleToken')

const validateToken = (req, res, next) => {
    let auth = hasAuthorization(req)
    if (!auth.isValid) {
        return res.status(409).send({ error: "Access denied" })
    }

    try{
        if(verifyValidToken(auth.token)) {
            next()
        }
    } catch (err) {
        return res.status(409).send({ 
            error: "Access denied",
            type: 'invalid token'
        })
    }
}

module.exports = { validateToken }