const User = require('../models/user');
const Turf = require('../models/turf');
const Match = require('../models/match');

const currentDate = new Date().toISOString().split('T')[0];

module.exports.home = async function (req, res) {
    try {
        if (req.user) {
            let user = await User.find({});
            let turf = await Turf.find({});
            let match = await Match.find({})
            .populate('turf');
            return res.render('home', {
                title: " | Home",
                turf: turf,
                matches: match,
                users: user,
                currentDate: currentDate
            });
        }else{
            return res.redirect('/users/sign-in');
        }
    } catch (error) {
        console.log("Error in rendering home", error);
    };
};

module.exports.fAQ = async function (req, res) {
    try {
        if (req.user) {
            return res.render('faq', {
                title: " | FAQ"
            });
        }else{
            return res.redirect('/users/sign-in');
        }
    } catch (error) {
        console.log("Error in rendering home", error);
    };
};