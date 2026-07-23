const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

// Inscription
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis.' });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Enregistrer en BDD
    const userId = await UserModel.create(email, hashedPassword);

    res.status(201).json({ message: 'Compte créé avec succès !', userId });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Connexion
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis.' });
    }

    // Vérifier l'existence de l'utilisateur
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Identifiants invalides.' });
    }

    // Comparer les mots de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Identifiants invalides.' });
    }

    // Générer le token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'cnjdnvfbjvbfhvj4349067212453',
      { expiresIn: '24h' }
    );

    res.json({ message: 'Connexion réussie !', token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};