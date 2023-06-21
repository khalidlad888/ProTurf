const express = require('express');
const router = express.Router();

const turfController = require('../../../controllers/turf_controller');

router.post('/create-turf', turfController.create);
router.get('/destroy/:id', turfController.destroy);


module.exports = router;