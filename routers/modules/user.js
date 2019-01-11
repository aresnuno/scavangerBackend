module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: function (req, reply) {
            return `<h1>WELCOME</h1>`
        }
    },
    {
        method: 'GET',
        path: '/api/v1/users',
        handler: function (req, reply) {
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
        handler: function (req, reply) {
            const {
                e_id,
                e_name,
                e_foodType,
                e_alergies = false
            } = req.payload
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
    }
]