const User = require('../models/user');
const Turf = require('../models/turf');

module.exports.home = async function (req, res) {
    try {
        if (req.user) {
            let user = await User.find({});
            let turf = await Turf.find({});
            return res.render('home', {
                title: " | Home",
                turf: turf,
                users: user
            });
        }else{
            return res.redirect('/users/sign-in');
        }
    } catch (error) {
        console.log("Error in rendering home", error);
    };
};