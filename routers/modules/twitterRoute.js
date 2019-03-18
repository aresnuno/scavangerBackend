
const users = require('./../../model/users')
const twitterController = require('./../../controllers/twitterController')
const Joi = require('joi')

module.exports = [
    {
        method: 'GET',
        path: '/api/v1/getAllTwit',
        handler: twitterController.getAllTwit,
        options: {
            description: 'Get All Twit',
            notes: 'Returns all Users',
            tags: ['api', 'Twitter'],
        },
    },
    {
        method: 'POST',
        path: '/api/v1/addTwit',
        handler: twitterController.addTwit,
        options: {
            description: 'Create A Twit',
            notes: 'Create A Twit',
            tags: ['api', 'Twitter'],
            validate: {
                payload: {
                    e_id: Joi.string()
                        .required()
                        .description('the Twit ID'),
                    e_name: Joi.string()
                        .required()
                        .description('the Twitter name'),
                    e_status: Joi.string()
                        .required()
                        .description('The Twit Content')
                }
            }
        },
    },
    {
        method: 'POST',
        path: '/api/v1/removeTwit',
        handler: twitterController.removeTwitById,
        options: {
            description: 'Remove A User by _Id',
            notes: 'Remove A User by _Id',
            tags: ['api', 'Twitter'],
            validate: {
                payload: {
                    id: Joi.string()
                        .required()
                        .description('the Twit ID')
                }
            }
        },
    }
]