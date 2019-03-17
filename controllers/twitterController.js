
const twitter = require('./../model/twitter')

module.exports = {
    getAllTwit (req, reply) {
        return twitter.find()
    },
    addTwit (req, reply) {
        const {
            e_id,
            e_name,
            e_status
        } = req.payload

        return new Promise((resolve) => {
            const user = new twitter({
                e_id,
                e_name,
                e_status
            })
            resolve (user.save())
        })
    },
    removeTwitById (req, reply) {
        return new Promise ((resolve, reject) => {
            twitter.findByIdAndDelete(req.payload.id, (err, res) => {
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