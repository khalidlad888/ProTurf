//Requiring express and port
const express = require('express');
const passport = require('passport');
const router = express();

const adminsController = require('../controllers/admins_controller');

router.get('/', adminsController.home);

router.get('/sign-up', adminsController.signUp);

router.get('/sign-in', adminsController.signIn);

router.post('/create', adminsController.create);

router.post('/create-session', passport.authenticate(
    'admin',
    {failureRedirect: '/admins/sign-in'},
), adminsController.createSession);

router.get('/sign-out', adminsController.destroySession);

// router.get('/dashboard', adminsController.signIn);

// router.get('/bookings', adminsController.signIn);

// router.get('/users', adminsController.signIn);

// router.get('/reports', adminsController.signIn);

router.get('/setting/:id', passport.checkAuthentication, adminsController.setting);

router.post('/setting/update-turf', adminsController.update);



//exporting router
module.exports = router;