const alertService = require('../services/alertService');

// Fonction pour simuler ou récupérer le vrai prix (ici on simule pour l'exemple, ou tu peux interroger Redis/CoinGecko)
async function fetchCurrentPrice(coinId) {
  // Exemple de prix simulés (tu pourras remplacer par ton service de prix réel)
  const mockPrices = {
    bitcoin: 72000, // Déclenchera l'alerte si tu as mis target_price < 72000 avec ABOVE
    ethereum: 3600  // Déclenchera l'alerte si tu as mis target_price < 3600 avec ABOVE
  };
  return mockPrices[coinId] || null;
}

function startPriceMonitor() {
  console.log('👀 Moteur de surveillance des prix démarré...');

  // Vérification toutes les 15 secondes
  setInterval(async () => {
    try {
      const pendingAlerts = await alertService.getPendingAlerts();
      if (pendingAlerts.length === 0) return;

      for (const alert of pendingAlerts) {
        const currentPrice = await fetchCurrentPrice(alert.coin_id);
        if (!currentPrice) continue;

        let triggered = false;

        if (alert.price_condition === 'ABOVE' && currentPrice >= alert.target_price) {
          triggered = true;
        } else if (alert.price_condition === 'BELOW' && currentPrice <= alert.target_price) {
          triggered = true;
        }

        if (triggered) {
          console.log(`\n🚨 ALERTE DÉCLENCHÉE ! [ID: ${alert.id}]`);
          console.log(`Crypto: ${alert.coin_id.toUpperCase()} | Prix Actuel: $${currentPrice} | Objectif: ${alert.price_condition} $${alert.target_price}`);
          
          // On met à jour en BDD pour qu'elle ne se déclenche plus en boucle
          await alertService.markAsTriggered(alert.id);
        }
      }
    } catch (error) {
      console.error('❌ Erreur dans le worker de prix :', error.message);
    }
  }, 15000); // 15 secondes
}

module.exports = startPriceMonitor;