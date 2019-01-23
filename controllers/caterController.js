
const caters = require('./../model/caters')
const moment = require('moment');

module.exports = {
    cronCater (req, reply) {
        const today = moment().format('DD/MM/YYYY')
        return new Promise((resolve) => {
            caters.findOne({cater_date: today}, (err, res) => {
                if (err) {
                    resolve (err)
                }
                if (!res) {
                    const cater = new caters({
                        cater_date: today,
                        cater_giver: []
                    })
                    resolve (cater.save())
                } else {
                    const errResponse = {
                        success: false,
                        errCode: 'SCVG00000001',
                        errMsg: 'Cater Already Exist'
                    }
                    resolve (errResponse)
                }
            })
        })
    },
    getAllCater (req, reply) {
        return caters.find()
    },
    addCaterGiver (req, reply) {
        const { cater_date, cater_giver} = req.payload
        const giver_status = {
          taken: false, 
          taker: null
        }
        return caters.update({'cater_date': cater_date}, {$push: {'cater_giver': {giver: cater_giver,  giver_status}}})
    },
    takeCater(req, reply) {
        const { cater_date, giver_id, taker} = req.payload
        return caters.findOneAndUpdate({'cater_date': cater_date, 'cater_giver._id': giver_id}, {'cater_giver.$.giver_status.taken': true, 'cater_giver.$.giver_status.taker': taker})
    },
}