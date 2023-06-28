const Admin = require('../models/admin');


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
        }else{
            return res.redirect('/admins/sign-in');
        }
    } catch (error) {
        console.log("Error in rendering home", error);
    };
};


module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    };

    return res.render('admin_sign_up', {
        title: " | Admin Sign Up"
    });
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
                console.log('Admin Signed Up Successfully');
                return res.redirect('/admins/sign-in');
            } else {
                return res.redirect('back');
            };
        });
    } catch (err) {
        // req.flash('error', err);
        console.log(err, "Error in creating the user");
    };
};

//Sign ip data and create the session for the user
module.exports.createSession = async function (req, res) {
    try {
        console.log('Admin Signed In Successfully');
        // let admins = await Admin.find({});
        let admin = req.user;
        return res.render('admin_home', {
            title: " | Admin Home",
            admin: admin
        });
    } catch (err) {
        console.log("Error", err);
    }
};

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            // req.flash('error', 'Error in logging out');
            console.log(err, "Error in logging out");
        };
        console.log('Admin Signed Out Successfully');
        return res.redirect('/admins/sign-in');
    });
};