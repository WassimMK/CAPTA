const express = require('express');
const router = express.Router();
const cryptoController = require('../controllers/cryptoController');

// Endpoint public ou protégé pour consulter un prix
router.get('/:coinId', cryptoController.getPrice);

module.exports = router;