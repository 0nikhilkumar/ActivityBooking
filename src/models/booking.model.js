import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    activity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity',
        required: true
    },
    dateTime: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});


bookingSchema.index({user: 1, activity: 1}, {unique: true});

export const Booking = mongoose.model("Booking", bookingSchema);