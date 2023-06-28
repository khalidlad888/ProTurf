const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    loginID:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    number:{
        type: Number,
        required: true
    },
    avatar: {
        type: String
    },
    turf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Turf'
    }
},{
    timestamps: true
})

const Admin = mongoose.model('Admin', adminSchema);
 
module.exports = Admin;