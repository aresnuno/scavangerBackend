
const users = require('./../../model/users')
const userController = require('./../../controllers/userController')
const Joi = require('joi')

module.exports = [
    {
        method: 'GET',
        path: '/api/v1/getAllUsers',
        handler: userController.getAllUser,
        options: {
            description: 'Get All Users',
            notes: 'Returns all Users',
            tags: ['api', 'User'],
        },
    },
    {
        method: 'POST',
        path: '/api/v1/addUser',
        handler: userController.addUser,
        options: {
            description: 'Create A User',
            notes: 'Create A User',
            tags: ['api', 'User'],
            validate: {
                payload: {
                    e_id: Joi.string()
                        .required()
                        .description('the employee'),
                    e_name: Joi.string()
                        .required()
                        .description('the employee name'),
                    e_foodType: Joi.string()
                        .required()
                        .description('type of the cattering healthy or normal'),
                    e_alergies: Joi.boolean()
                        .description('is the employee have alergies or nnot')
                }
            }
        },
    },
    {
        method: 'DELETE',
        path: '/api/v1/removeUser',
        handler: userController.removeUserById,
        options: {
            description: 'Remove A User by _Id',
            notes: 'Remove A User by _Id',
            tags: ['api', 'User'],
            validate: {
                payload: {
                    id: Joi.string()
                        .required()
                        .description('the employee')
                }
            }
        },
    }
]