// const passport = require('passport');

// const LocalStrategy = require('passport-local').Strategy;

// const User = require('../models/user');

// const Admin = require('../models/admin');

// //Authentication using passport
// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passReqToCallback: true
// },
//     function (req, email, password, done) {
//         try {
//             User.findOne({ email: email }).then((user) => {
//                 if (!user || user.password != password) {
//                     // console.log("Invalid username or password");
//                     // Using flash and noty to display messages
//                     req.flash('error', 'Invalid Username or Password');
//                     return done(null, false);
//                 };
//                 return done(null, user);
//             });
//         } catch (err) {
//             if (err) {
//                 req.flash('error', err);
//                 // console.log("Error in finding user --> Passport");
//                 return done(err);
//             };
//         };
//     }
// ));

// //Serializing the user to decide which key is to be kept in the cookies
// passport.serializeUser(function (user, done) {
//     done(null, user.id);
// });

// //Deserializing the user from the key in the cookies
// passport.deserializeUser(function (id, done) {
//     try {
//         User.findById(id).then((user) => {
//             return done(null, user);
//         });
//     } catch (err){
//         console.log("Error in finding user --> Passport");
//         return done(err);
//     };
// });


// //check if user is authenticated
// passport.checkAuthentication = function(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     };

//     //if the user is not signed in 
//     return res.redirect('/users/sign-in')
// };

// passport.setAuthenticatedUser = function(req, res, next){
//     if(req.isAuthenticated()){
//         res.locals.user = req.user;
//     };

//     next();
// };

// module.exports = passport;

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
        console.log('Invalid Username or Password')
        // req.flash('error', 'Invalid Username or Password');
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
        console.log('Invalid Username or Password')
        // req.flash('error', 'Invalid Username or Password');
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
