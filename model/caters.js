const mongoose = require('mongoose')
const schemas = require('./schema')

module.exports = mongoose.model('Cater', schemas.CaterSchema)