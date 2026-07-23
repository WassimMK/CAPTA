const db = require('../config/db');

const UserModel = {
  // Créer un nouvel utilisateur
  async create(email, hashedPassword) {
    const [result] = await db.query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );
    return result.insertId;
  },

  // Chercher un utilisateur par son email
  async findByEmail(email) {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }
};

module.exports = UserModel;