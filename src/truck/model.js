import mongoose, { Schema, model } from "mongoose";

const truckSchema = new Schema({
    plateNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        min: 1999
    },
    isAvailable: {
        type: Boolean,
        required: true
    },
    mileage: {
        type: Number,
        default: 0,
        min: 0
    },
    lastMaintenance: {
        type: Date
    },
    assignedDriver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        default: null
    },
    createdAt: {
       type: Date,
       default: Date.now
    }
});

export default model('Truck', truckSchema);