
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UsersSchema = new Schema({
    e_id: String,
    e_name: String,
    e_foodType: String,
    e_alergies: Boolean
})

const giver_status = new Schema({
    taken: Boolean,
    taker: UsersSchema
})

const CaterSchema = new Schema({
    cater_date: String,
    cater_giver: [{
        giver: UsersSchema,
        giver_status 
    }]
})

const TwitterSchema = new Schema({
    e_id: String,
    e_name: String,
    e_status: String,
})

module.exports = {
    CaterSchema, UsersSchema, TwitterSchema
}
