
    const Joi = require('joi')
    const caters = require('./../../model/caters')
    const caterController = require('../../controllers/caterController')
    const moment = require('moment');

module.exports = [
    {
        method: 'GET',
        path: '/api/v1/getAllCater',
        handler: caterController.getAllCater,
        options: {
            description: 'Get All Cater Day',
            notes: 'Returns all Catering Array',
            tags: ['api', 'Cater'],
        },
    },
    {
        method: 'POST',
        path: '/api/v1/cronCater',
        handler: caterController.cronCater,
        options: {
            description: 'Create A Cater',
            notes: 'Create A new Cater',
            tags: ['api', 'Cater'],
        },
    },
    {
        method: 'POST',
        path: '/api/v1/giveCater',
        handler: caterController.addCaterGiver,
        options: {
            description: 'Give Cater',
            notes: 'Add User To The Cater Giver',
            tags: ['api', 'Cater'],
            validate: {
                payload: {
                    cater_date : Joi.string()
                            .required()
                            .description('the date of the cater'),
                    cater_giver : Joi.object()
                            .required()
                            .description('the giver data')
                }
            }
        },
    },
    {
        method: 'POST',
        path: '/api/v1/takeCater',
        handler: caterController.takeCater,
        options: {
            description: 'Take A Cater',
            notes: 'Take A Cater',
            tags: ['api', 'Cater'],
            validate: {
                payload: {
                    cater_date : Joi.string()
                            .required()
                            .description('the date of the cater'),
                    giver_id : Joi.string()
                            .required()
                            .description('the giver id (5c39c1d15f019b05fd36f3e2)'),
                    taker: Joi.object()
                            .required()
                            .description('the taker data'),
                }
            }
        },
    },
]