
    const Joi = require('joi')
    const caters = require('./../../model/caters')

module.exports = [
    {
        method: 'GET',
        path: '/api/v1/cater',
        handler: function(req, reply) {
            return caters.find()
        },
        options: {
            description: 'Get All Cater Day',
            notes: 'Returns all Catering Array',
            tags: ['api', 'Cater'],
        },
    },
    {
        method: 'POST',
        path: '/api/v1/cater',
        handler: function(req, reply) {
            const { cater_id, cater_date, cater_giver = []} = req.payload
            const cater = new caters({
                cater_id,
                cater_date,
                cater_giver
            })
            return cater.save()
        },
        options: {
            description: 'Create A Cater',
            notes: 'Create A new Cater',
            tags: ['api', 'Cater'],
            validate: {
                payload: {
                    cater_id : Joi.string()
                            .required()
                            .description('the id of the cater'),
                    cater_date : Joi.string()
                            .required()
                            .description('the date of the cater')
                }
            }
        },
    },
    {
        method: 'POST',
        path: '/api/v1/addCaterGiver',
        handler: function(req, reply) {
            const { cater_date, cater_giver} = req.payload
            return caters.update({'cater_date': cater_date}, {$push: {'cater_giver': cater_giver}})
        },
        options: {
            description: 'Add User To The Cater',
            notes: 'Add User To The Cater',
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
]