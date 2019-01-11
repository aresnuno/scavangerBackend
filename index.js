const hapi = require('hapi')
const mongoose = require('mongoose')
const server = hapi.server({
    port: 4000,
    host: 'localhost'
})
const users = require('./model/users')
const caters = require('./model/caters')
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const Joi = require('joi')
mongoose.connect('mongodb://scavanger:scavanger12@ds151814.mlab.com:51814/scavanger')

mongoose.connection.once('open', () => {
    console.log('connected to database')
})
const init = async () => {
    const swaggerOptions = {
        info: {
                title: 'Scavangers API Documentation',
                version: Pack.version,
            },
        grouping: 'tags'
        };
    
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);
    
    server.route([
        {
            method: 'GET',
            path: '/',
            handler: function(req, reply) {
                return `<h1>WELCOME</h1>`
            }
        },
        {
            method: 'GET',
            path: '/api/v1/users',
            handler: function(req, reply) {
                return users.find()
            },
            options: {
                description: 'Get All Users',
                notes: 'Returns all Users',
                tags: ['api', 'User'],
            },
        },
        {
            method: 'POST',
            path: '/api/v1/users',
            handler: function(req, reply) {
                const { e_id, e_name, e_foodType, e_alergies = false} = req.payload
                const user = new users({
                    e_id,
                    e_name,
                    e_foodType,
                    e_alergies
                })
                return user.save()
            },
            options: {
                description: 'Create A User',
                notes: 'Create A User',
                tags: ['api', 'User'],
                validate: {
                    payload: {
                        e_id : Joi.string()
                                .required()
                                .description('the employee'),
                        e_name : Joi.string()
                                .required()
                                .description('the employee name'),
                        e_foodType : Joi.string()
                                .required()
                                .description('type of the cattering healthy or normal'),
                        e_alergies : Joi.boolean()
                                .description('is the employee have alergies or nnot')
                    }
                }
            },
        },
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

    ])
    await server.start();
    console.log(`server running at ${server.info.uri}`)
};

init(); 