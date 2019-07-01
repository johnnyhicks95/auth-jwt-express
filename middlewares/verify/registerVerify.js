const response = require('../../utils/response')

module.exports = (req, res, next) => {
    const data = { ...req.body.data }
    if (
            typeof data.firstname === 'string' &&
            typeof data.lastname === 'string' &&
            typeof data.email === 'string' &&
            typeof data.password === 'string' &&
            typeof data.username === 'string'
        ) {
            next()
    } else {
        res.status(400).json(response('bad'))
    }
}