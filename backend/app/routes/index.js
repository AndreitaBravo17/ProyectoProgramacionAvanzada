const router = require('express').Router()
const fs = require('fs')

const pathRouter = `${__dirname}`

const removeExt = (file) => {
    return file.split('.').shift()
}

const skiped = ['index']

/* Import middleware using its name */
fs.readdirSync(pathRouter).filter(file => {
    const filename = removeExt(file)
    const mustBeSkiped = skiped.includes(filename)
    if(!mustBeSkiped) {
        router.use(`/${filename}`, require(`./${filename}`).router)
    }

})

/* Send response in case of request is not valid */ 
router.get('/*', (req, res) => {
    res.status(404)
    res.send({
        error: "Not found"
    })
})

module.exports = { router }