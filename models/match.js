const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    matchName: {
        type: String,
        required: true,
        unique: true
    },
    gameName: {
        type: String,
        enum: ['Cricket', 'Football'],
        required: true
    },
    gameLevel: {
        type: String,
        enum: ['Beginner', 'Amatuer', 'Intermediate', 'Skilled', 'Experienced'],
        required: true
    },
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

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;