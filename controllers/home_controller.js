const User = require('../models/user');
const Turf = require('../models/turf');
const Match = require('../models/match');

module.exports.home = async function (req, res) {
    try {
        if (req.user) {
            let user = await User.find({});
            let turf = await Turf.find({});
            let match = await Match.find({});
            return res.render('home', {
                title: " | Home",
                turf: turf,
                matches: match,
                users: user
            });
        }else{
            return res.redirect('/users/sign-in');
        }
    } catch (error) {
        console.log("Error in rendering home", error);
    };
};