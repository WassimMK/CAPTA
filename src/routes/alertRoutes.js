const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');

// Route POST : créer une alerte
router.post('/', alertController.createAlert);

// Route GET : récupérer les alertes
router.get('/', alertController.getAlerts);

module.exports = router;