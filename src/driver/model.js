import { Schema, model } from 'mongoose';

const driverSchema = new Schema({
    name: String,
    lastname: String,
    licenseNumber: String,
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: String
})



export default model('Driver', driverSchema);