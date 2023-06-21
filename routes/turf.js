const express = require('express');
const router = express.Router();

const turfController = require('../controllers/turf_controller');

router.get('/:id', turfController.render);

router.post('/create-booking', turfController.createBooking)

module.exports = router;