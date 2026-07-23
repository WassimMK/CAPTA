const coinGeckoService = require('../services/coinGeckoService');

exports.getPrice = async (req, res) => {
  try {
    const { coinId } = req.params;
    const priceData = await coinGeckoService.getCryptoPrice(coinId);
    
    res.json({
      coin: coinId,
      price_usd: priceData.usd
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};