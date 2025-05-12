import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const driverSchema = new Schema({
    name: String,
    lastname: String,
    licenseNumber: String,
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//hash password before saving
driverSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt);
        next();

    }catch (err) {
        next(err);
    }
});


export default model('Driver', driverSchema);