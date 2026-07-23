const db = require('../config/db');
const AppError = require('../utils/appError');

class AlertService {
  async createAlert({ userId, coinId, targetPrice, priceCondition }) {
    const validConditions = ['ABOVE', 'BELOW'];
    if (!validConditions.includes(priceCondition)) {
      throw new AppError(`La condition doit être : ${validConditions.join(' ou ')}`, 400);
    }
    if (!targetPrice || targetPrice <= 0) {
      throw new AppError('Le prix cible doit être un nombre supérieur à 0.', 400);
    }

    const query = `
      INSERT INTO alerts (user_id, coin_id, target_price, price_condition, is_triggered)
      VALUES (?, ?, ?, ?, false)
    `;
    const [result] = await db.execute(query, [userId, coinId, targetPrice, priceCondition]);

    return { id: result.insertId, userId, coinId, targetPrice, priceCondition, isTriggered: false };
  }

  async getAlerts(userId) {
    const query = 'SELECT * FROM alerts WHERE user_id = ? ORDER BY id DESC';
    const [rows] = await db.execute(query, [userId]);
    return rows;
  }

  // 🆕 Récupérer uniquement les alertes qui n'ont pas encore sonné
  async getPendingAlerts() {
    const query = 'SELECT * FROM alerts WHERE is_triggered = false';
    const [rows] = await db.execute(query);
    return rows;
  }

  // 🆕 Marquer une alerte comme déclenchée pour ne pas spammer
  async markAsTriggered(alertId) {
    const query = 'UPDATE alerts SET is_triggered = true WHERE id = ?';
    await db.execute(query, [alertId]);
  }
}

module.exports = new AlertService();