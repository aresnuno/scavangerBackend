const userRoute = require('./modules/userRoute')
const caterRoute = require('./modules/caterRoute')
const twitterRoute = require('./modules/twitterRoute')

const Joi = require('joi')

const Routers = [
    {
        method: 'GET',
        path: '/',
        handler: function(req, reply) {
            return `<h1>WELCOME</h1> <h2><a href="/documentation">Click Here</a> to see the documentation</h2>`
        }
    },
].concat(
    // userRoute,
    // caterRoute,
    twitterRoute
)

module.exports = Routers