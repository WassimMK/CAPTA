require('dotenv').config();
const app = require('./app');
const db = require('./config/db');
require('./config/redis'); 
const startPriceMonitor = require('./workers/priceMonitorWorker'); // 👈 Import du worker

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    const connection = await db.getConnection();
    console.log('✅ Connexion à MySQL (XAMPP) réussie !');
    connection.release();

    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur : http://localhost:${PORT}`);
      
      // 👈 Lancement de la surveillance en arrière-plan
      startPriceMonitor();
    });
  } catch (error) {
    console.error('❌ Impossible de se connecter à la base de données MySQL :', error.message);
    process.exit(1);
  }
}

startServer();