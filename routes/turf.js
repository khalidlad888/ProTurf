const express = require('express');
const router = express.Router();
const passport = require('passport');

const turfController = require('../controllers/turf_controller');

router.get('/:id', passport.checkAuthentication, turfController.render);

router.post('/create-booking', passport.checkAuthentication, turfController.createBooking)

module.exports = router;