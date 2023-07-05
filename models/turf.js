const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const LOGO_PATH = path.join('/uploads/turves/logos');

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
    price: {
        type: Number,
        required: true
    },
    photos: {
        type: [String]
    },
    logo: {
        type: String
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
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


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', LOGO_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

//Static functions
turfSchema.statics.uploadedLogo =  multer({ storage: storage }).single('logo');
turfSchema.statics.logoPath = LOGO_PATH;


const Turf = mongoose.model('Turf', turfSchema);

module.exports = Turf;