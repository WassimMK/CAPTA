const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const cryptoRoutes = require('./routes/cryptoRoutes');
const alertRoutes = require('./routes/alertRoutes');
const errorHandler = require('./middlewares/errorHandler');

// Middleware pour lire le JSON
app.use(express.json());

// Enregistrement des routes de l'API
app.use('/api/auth', authRoutes);
app.use('/api/crypto', cryptoRoutes);
app.use('/api/alerts', alertRoutes);

// Route Healthcheck
app.get('/', (req, res) => {
  res.json({ message: 'API Crypto Tracker opérationnelle ! 🚀' });
});

app.use(errorHandler);

module.exports = app;