const db = require('../config/db');

const AlertModel = {
  // Créer une alerte
  async create(userId, coinId, targetPrice, priceCondition) {
    const [result] = await db.query(
      'INSERT INTO alerts (user_id, coin_id, target_price, price_condition) VALUES (?, ?, ?, ?)',
      [userId, coinId, targetPrice, priceCondition]
    );
    return result.insertId;
  },

  // Récupérer toutes les alertes d'un utilisateur
  async findByUserId(userId) {
    const [rows] = await db.query(
      'SELECT * FROM alerts WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  },

  // Récupérer les alertes non déclenchées (pour le Worker de surveillance)
  async getActiveAlerts() {
    const [rows] = await db.query(
      'SELECT * FROM alerts WHERE is_triggered = 0'
    );
    return rows;
  },

  // Marquer une alerte comme déclenchée
  async markAsTriggered(alertId) {
    await db.query(
      'UPDATE alerts SET is_triggered = 1 WHERE id = ?',
      [alertId]
    );
  }
};

module.exports = AlertModel;