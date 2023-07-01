const express = require('express');
const router = express.Router();

const matchesController = require('../controllers/matches_controller');

router.get('/', matchesController.render);

router.post('/create-match', matchesController.createMatch);

module.exports = router;