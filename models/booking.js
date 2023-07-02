const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    date: {
        type: String,
        default: Date,
        required: true     
    },
    time: {
        type: [String],
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    turf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Turf'
    }
}, {
    timestamps: true
})

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;