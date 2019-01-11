const userRoute = require('./modules/userRoute')
const caterRoute = require('./modules/caterRoute')

const Joi = require('joi')

const Routers = [
    {
        method: 'GET',
        path: '/',
        handler: function(req, reply) {
            return `<h1>WELCOME</h1>`
        }
    },
].concat(
    userRoute,
    caterRoute
)

module.exports = Routers