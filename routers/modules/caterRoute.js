
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
            const giver_status = {
              taken: false, 
              taker: null
            }
            return caters.update({'cater_date': cater_date}, {$push: {'cater_giver': {giver: cater_giver,  giver_status}}})
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
    {
        method: 'POST',
        path: '/api/v1/takeCater',
        handler: function(req, reply) {
            const { cater_date, giver_id, taker} = req.payload
            return caters.findOneAndUpdate({'cater_date': cater_date, 'cater_giver._id': giver_id}, {'cater_giver.$.giver_status.taken': true, 'cater_giver.$.giver_status.taker': taker})
        },
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