const express = require('express');
const router = express.Router();
const passport = require('passport');

const matchesController = require('../controllers/matches_controller');

router.get('/', passport.checkAuthentication, matchesController.render);

router.post('/create-match', passport.checkAuthentication, matchesController.createMatch);

module.exports = router;