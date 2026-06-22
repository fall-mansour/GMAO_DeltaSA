// backend/db.js
const mysql = require('mysql2');
require('dotenv').config(); // Charge les variables du fichier .env

// Configuration du pool de connexions
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'GMAO',
  port: process.env.DB_PORT || 3006,
  waitForConnections: true,
  connectionLimit: 10, // Nombre maximal de connexions simultanées
  queueLimit: 0
});

// Convertir le pool pour utiliser les Promises (async/await)
const promisePool = pool.promise();

// Tester immédiatement la connexion au démarrage du script
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Erreur de connexion à la base de données GMAO :', err.message);
  } else {
    console.log('✅ Connexion réussie à la base de données MySQL (GMAO) !');
    connection.release(); // Libère la connexion pour le pool
  }
});

module.exports = promisePool;