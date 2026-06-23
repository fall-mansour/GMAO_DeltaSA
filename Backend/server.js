// backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");
const loginRoutes = require("./routes/login");
const userRoutes = require("./routes/user");

const app = express();

// 1. CONFIGURATION CORS AMÉLIORÉE (Doit être placée AVANT express.json() et les routes)
app.use(
  cors({
    origin: "http://localhost:5173", // Remplace par l'URL exacte de ton frontend React (ex: 5173 ou 3000)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());

// 2. MIDDLEWARE DE DIAGNOSTIC (Pour forcer l'affichage des requêtes entrantes)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 3. ENREGISTREMENT DES ROUTES
app.use("/api/auth", loginRoutes);
app.use("/api/admin", userRoutes);

// Gestion globale des erreurs pour éviter le crash du CORS en cas de 403/500
app.use((err, req, res, next) => {
  console.error("Erreur interceptée par le serveur :", err);
  res.status(500).json({ message: "Erreur interne du serveur" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur SmartTech Central démarré sur le port ${PORT}`);
});
