const axios = require('axios');
const redis = require('../config/redis');

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

exports.getCryptoPrice = async (coinId) => {
  const cacheKey = `crypto:${coinId.toLowerCase()}`;

  // 1. Vérifier si le prix est déjà en cache dans Redis
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    console.log(`⚡ [REDIS CACHE] Prix de ${coinId} récupéré depuis le cache !`);
    return JSON.parse(cachedData);
  }

  // 2. Si pas en cache, appeler l'API CoinGecko
  console.log(`🌐 [API EXTERNE] Appel de CoinGecko pour ${coinId}...`);
  const response = await axios.get(`${COINGECKO_BASE_URL}/simple/price`, {
    params: {
      ids: coinId,
      vs_currencies: 'usd'
    }
  });

  const priceData = response.data[coinId.toLowerCase()];
  if (!priceData) {
    throw new Error(`Cryptomonnaie '${coinId}' introuvable.`);
  }

  // 3. Sauvegarder dans Redis pour 60 secondes ('EX', 60)
  await redis.set(cacheKey, JSON.stringify(priceData), 'EX', 60);

  return priceData;
};