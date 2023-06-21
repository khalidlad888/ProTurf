const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    date: {
        type: String,
        default: Date,
        required: true     
    },
    time: {
        type: String,
        enum: ['6to7am','7to8am','8to9am','9to10am','10to11am','11to12pm','12to1pm','1to2pm','2to3pm','3to4pm','4to5pm','5to6pm','6to7pm','7to8pm','8to9pm','9to10pm','10to11pm'],
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