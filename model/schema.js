
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UsersSchema = new Schema({
    e_id: String,
    e_name: String,
    e_foodType: String,
    e_alergies: Boolean
})

const CaterSchema = new Schema({
    cater_id: String,
    cater_date: String,
    cater_giver: []
})

module.exports = {
    CaterSchema, UsersSchema
}
