import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    name: String,
    lastname: String,
    licenseNumber: String,
    username: {
        type: String,
        unique: true,
        required: true
    },
    assignedTruck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Truck',
        default: null
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['driver', 'admin'],
        default: 'driver'
    }
});

//hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt);
        next();

    }catch (err) {
        next(err);
    }
});


export default model('Driver', userSchema);