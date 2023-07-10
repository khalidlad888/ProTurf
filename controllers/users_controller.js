const User = require('../models/user');
const Booking = require('../models/booking');

const currentDate = new Date().toISOString().split('T')[0];

module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    };

    return res.render('user_sign_up', {
        title: " | Sign Up"
    });
};

//rendering the signin page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
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
        User.findOne({ number: req.body.number }).then((user) => {
            if (!user) {
                let user = User.create(req.body);
                req.flash('success', 'Signed Up Successfully');
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
    req.flash('success', 'Signed In Successfully');
    return res.redirect('/');
};

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            // req.flash('error', 'Error in logging out');
            console.log(err, "Error in logging out");
        };
        req.flash('success', 'Signed Out Successfully');
        return res.redirect('/');
    });
};

module.exports.profile = async function (req, res) {
    try {
        let user = await User.findById(req.params.id);
        let booking = await Booking.find({user: req.params.id})
        .populate('turf');
        return res.render('user_profile', {
            title: "| Profile",
            bookings: booking,
            currentDate: currentDate,
            profile_user: user
        });
    } catch (err) {
        if (err) { console.log(err) }
    }
};

module.exports.update = async function (req, res) {
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if (err) { console.log('*****MulterError:', err) };

                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {
                    if (user.avatar) {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    };

                    user.avatar = User.avatarPath + '/' + req.file.filename
                };
                user.save();
                req.flash('success', 'Profile Updated Successfully');
                return res.redirect('back');
            });

        } catch (err) {
            req.flash('error', err);
            return res.redirect('back');
        }

    } else {
        return res.status(401).send('Unauthorized')
    };
};