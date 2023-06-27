//Setting up mongoose configuration
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://khalidlad888:hbM11jO7r3XnX2aw@clusterkop.ngdlznp.mongodb.net/');


const db = mongoose.connection;

db.on('Error', console.error.bind(console, 'Error in connecting to database'));

db.once('open', function () {
    console.log("Connection to MongoDB successful");
});

module.exports = db;