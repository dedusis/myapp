const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    licenseNumber: String
})



module.exports = mongoose.model('Driver', driverSchema);