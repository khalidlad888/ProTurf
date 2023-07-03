const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const Admin = require('../models/admin');

// User authentication strategy
passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true
}, function (req, email, password, done) {
  try {
    User.findOne({ email: email }).then((user) => {
      if (!user || user.password != password) {
        req.flash('error', 'Invalid Username or Password');
        return done(null, false);
      }
      return done(null, user);
    });
  } catch (err) {
    console.log("Error", err);
    // req.flash('error', err);
    return done(err);
  }
}));

// Admin authentication strategy
passport.use('admin',new LocalStrategy({
  usernameField: 'loginID',
  passReqToCallback: true
}, function (req, loginID, password, done) {
  try {
    Admin.findOne({ loginID: loginID }).then((admin) => {
      if (!admin || admin.password != password) {
        req.flash('error', 'Invalid Username or Password');
        return done(null, false);
      }
      return done(null, admin);
    });
  } catch (err) {
    console.log("Error", err);
    // req.flash('error', err);
    return done(err);
  }
}));

// Serializing and deserializing the user/admin
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id).exec();
    if (user) {
      return done(null, user);
    } else {
      const admin = await Admin.findById(id).exec();
      if (admin) {
        return done(null, admin);
      } else {
        throw new Error('User or Admin not found');
      }
    }
  } catch (err) {
    console.log("Error in finding user or admin --> Passport");
    return done(err);
  }
});


// Middleware to check if user/admin is authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/users/sign-in');
};

// Set authenticated user/admin in locals for views
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user instanceof User) {
      res.locals.user = req.user;
    } else if (req.user instanceof Admin) {
      res.locals.admin = req.user;
    }
  }
  next();
};


module.exports = passport;
