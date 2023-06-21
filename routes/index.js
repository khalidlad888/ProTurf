//Requiring express and port
const express = require('express');
const router = express();

//importing home controller
const homeController = require('../controllers/home_controller');

//router for getting req of home
router.get('/', homeController.home);

router.use('/users', require('./users'));
router.use('/api', require('./api'));
router.use('/turf', require('./turf'));

//exporting router
module.exports = router;