const User = require('../models/user');

module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    };

    return res.render('user_sign_up', {
        title: " | Sign Up"
    });
};

//rendering the signin page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    };

    return res.render('user_sign_in', {
        title: " | Sign In"
    });
};


//get the sign up data
module.exports.create = async function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    };
    try {
        User.findOne({ email: req.body.email }).then((user) => {
            if (!user) {
                let user = User.create(req.body);
                console.log('success', 'Signed Up Successfully');
                return res.redirect('/users/sign-in');
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
module.exports.createSession = function (req, res) {
    console.log('success', 'Signed In Successfully');
    return res.redirect('/');
};

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            // req.flash('error', 'Error in logging out');
            console.log(err, "Error in logging out");
        };
        console.log('success', 'Signed Out Successfully');
        return res.redirect('/');
    });
};