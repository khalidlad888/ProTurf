const User = require('../models/user');
const Turf = require('../models/turf');

module.exports.home = async function (req, res) {
    try {
        let user = await User.find({});
        let turf = await Turf.find({});
        return res.render('home', {
            title: " | Home",
            turf: turf,
            users: user
        });
    } catch (error) {
        console.log("Error in rendering home", error);
    };
};