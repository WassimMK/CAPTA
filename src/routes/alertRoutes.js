const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, alertController.createAlert);
router.get('/', authMiddleware, alertController.getAlerts);

module.exports = router;