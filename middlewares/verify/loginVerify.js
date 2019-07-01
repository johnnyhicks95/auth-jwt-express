const response = require('../../utils/response')

module.exports = (req, res, next) => {
    const data = { ...req.body.data }
    if (
            typeof data.email === 'string' &&
            typeof data.password === 'string'
        ) {
            next()
    } else {
        res.status(400).json(response('bad'))
    }
}