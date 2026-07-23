const Redis = require('ioredis');
require('dotenv').config();

// Connexion au conteneur Docker Redis
const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
});

redis.on('connect', () => {
  console.log('⚡ Connecté à Redis avec succès !');
});

redis.on('error', (err) => {
  console.error('❌ Erreur Redis :', err.message);
});

module.exports = redis;