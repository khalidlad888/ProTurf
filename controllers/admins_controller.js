const Admin = require('../models/admin');
const Turf = require('../models/turf');
const fs = require('fs');
const path = require('path');


module.exports.home = async function (req, res) {
    try {
        if (req.user) {
            let admins = await Admin.find({});
            let turf = await Turf.find({});
            return res.render('admin_home', {
                title: " | Admin Home",
                turf: turf,
                admins: admins
            });
        } else {
            return res.redirect('/admins/sign-in');
        }
    } catch (error) {
        console.log("Error in rendering home", error);
    };
};


module.exports.signUp = async function (req, res) {
    try {
        if (req.isAuthenticated()) {
            return res.redirect('/');
        };

        let turf = await Turf.find({});
        return res.render('admin_sign_up', {
            title: " | Admin Sign Up",
            turf: turf
        });
    } catch (err) {
        if (err) { console.log("Error", err); }
    }
};

//rendering the signin page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    };

    return res.render('admin_sign_in', {
        title: " | Admin Sign In"
    });
};


//get the sign up data
module.exports.create = async function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    };
    try {
        Admin.findOne({ loginID: req.body.loginID }).then((admin) => {
            if (!admin) {
                let admin = Admin.create(req.body);
                req.flash('success', 'Signed Up Successfully as Admin');
                return res.redirect('/admins/sign-in');
            } else {
                return res.redirect('back');
            };
        });
    } catch (err) {
        req.flash('error', err);
        console.log(err, "Error in creating the user");
    };
};

//Sign ip data and create the session for the user
module.exports.createSession = async function (req, res) {
    try {
        req.flash('success', 'Signed In Successfully as Admin');
        return res.redirect('/admins');
    } catch (err) {
        console.log("Error", err);
    }
};

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            req.flash('error', 'Error in logging out');
            console.log(err, "Error in logging out");
        };
        req.flash('success', 'Signed Out Successfully as Admin');
        return res.redirect('/admins/sign-in');
    });
};

module.exports.setting = async function (req, res) {
    try {
        if (req.user) {
            let admin = await Admin.findById(req.params.id);
            let turf = await Turf.find({ _id: req.user.turf });
            // console.log(admin);
            return res.render('admin_setting', {
                title: " | Admin Setting",
                profile_admin: admin,
                turf: turf,
            });
        } else {
            return res.redirect('/admins/sign-in');
        }
    } catch (error) {
        console.log("Error in rendering home", error);
    };
};

module.exports.update = async function (req, res) {
    try {
        let turf = await Turf.findById(req.user.turf);
        Turf.uploadedLogo(req, res, function (err) {
            if (err) { console.log('*****Multer Error', err) }

            turf.name = req.body.name;
            turf.number = req.body.number;
            turf.address = req.body.address;
            turf.location = req.body.location;
            turf.price = req.body.price;
            turf.admin = req.user.id;

            if (req.file) {
                if (turf.logo) {
                    fs.unlinkSync(path.join(__dirname, '..', turf.logo));
                };

                turf.logo = Turf.logoPath + '/' + req.file.filename
            };

            turf.save();
            return res.redirect('back');
        })
    } catch (err) {
        req.flash('error', 'Error in updating turf data');
    }
};