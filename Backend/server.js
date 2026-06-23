// backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Importer la connexion à la base de données pour l'initialiser
const db = require("./db");

const app = express();

// Middlewares de base
app.use(cors()); // Autorise ton frontend React à requêter le backend
app.use(express.json()); // Permet à Express de lire le format JSON dans les requêtes

// Petite route de test pour vérifier que l'API répond
app.get("/api/status", (req, res) => {
  res.json({
    status: "running",
    message: "Serveur GMAO Delta SA opérationnel",
  });
});

// Définition du port
const PORT = process.env.PORT || 5000;

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré avec succès sur le port ${PORT}`);
});
