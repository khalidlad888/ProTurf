const mongoose = require('mongoose');

const turfSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required:true
    },
    photos: {
        type: [String]
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking'
        }
    ]
}, {
    timestamps: true
})

const Turf = mongoose.model('Turf', turfSchema);

module.exports = Turf;