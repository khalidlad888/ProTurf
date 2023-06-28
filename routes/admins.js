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


//exporting router
module.exports = router;