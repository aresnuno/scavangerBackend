
const users = require('./../model/users')

module.exports = {
    getAllUser (req, reply) {
        return users.find()
    },
    addUser (req, reply) {
        const {
            e_id,
            e_name,
            e_foodType,
            e_alergies = false
        } = req.payload

        return new Promise((resolve) => {
            users.findOne({e_id: e_id}, (err, userData) => {
                if (err) resolve (err)
                if (!userData) {
                    const user = new users({
                        e_id,
                        e_name,
                        e_foodType,
                        e_alergies
                    })
                    resolve (user.save())
                } else {
                    const errResponse = {
                        success: false,
                        errCode: 'SCVG00000002',
                        errMsg: 'User Already Exist'
                    }
                    resolve (errResponse)
                }
            })
        })
    },
    removeUserById (req, reply) {
        return new Promise ((resolve, reject) => {
            users.findByIdAndDelete(req.payload.id, (err, res) => {
                if (err) reject (err)
                if (!res) {
                    const errResponse = {
                        success: false,
                        errCode: 'SCVG00000003',
                        errMsg: 'User did not Exist'
                    }
                    resolve (errResponse)
                } else {
                    resolve (res)
                }
            })
        })
    }

}