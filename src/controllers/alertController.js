const alertService = require('../services/alertService');

const createAlert = async (req, res, next) => {
  try {
    const { coin_id, target_price, price_condition, user_id } = req.body;
    
    // Si req.user existe (middleware JWT auth), on prend son ID, sinon on prend user_id du body ou 1
    const userId = req.user.id;

    const alert = await alertService.createAlert({
      userId,
      coinId: coin_id,
      targetPrice: target_price,
      priceCondition: price_condition
    });

    res.status(201).json({
      message: 'Alerte créée avec succès !',
      alertId: alert.id
    });
  } catch (error) {
    next(error);
  }
};

const getAlerts = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.query.user_id || 1;
    const alerts = await alertService.getAlerts(userId);
    
    res.status(200).json({
      status: 'success',
      results: alerts.length,
      data: { alerts }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAlert,
  getAlerts
};