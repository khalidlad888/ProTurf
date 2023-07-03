//Requiring express and port
const express = require('express');
const router = express();
const passport = require('passport');

//importing home controller
const homeController = require('../controllers/home_controller');

//router for getting req of home
router.get('/', passport.checkAuthentication, homeController.home);

router.use('/users', require('./users'));
router.use('/admins', require('./admins'));
router.use('/api', require('./api'));
router.use('/turf', require('./turf'));
router.use('/matches', require('./matches'));


//exporting router
module.exports = router;