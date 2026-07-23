const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Récupération du header 'Authorization' (format: "Bearer TOKEN")
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
  }

  try {
    // Vérification du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'cnjdnvfbjvbfhvj4349067212453');
    
    // On attache les infos de l'utilisateur à la requête 'req'
    req.user = decoded; 
    
    // On passe au contrôleur suivant
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token invalide ou expiré.' });
  }
};