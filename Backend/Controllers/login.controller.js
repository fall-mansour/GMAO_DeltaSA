// Backend/src/controllers/login.controller.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Importe ton modèle Utilisateur ou ton client de base de données (ex: Prisma, Mongoose ou Pool PG)
// const db = require('../config/db');

/**
 * Gestion de la connexion des utilisateurs
 */
exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    // 1. Validation des champs requis
    if (!login || !password) {
      return res.status(400).json({
        message: "Veuillez fournir un identifiant et un mot de passe.",
      });
    }

    /* 2. Récupération de l'utilisateur dans la base de données
       Exemple de requête SQL fictive : 
       const user = await db.query('SELECT * FROM utilisateurs WHERE login = $1', [login]);
    */
    // Pour l'exemple, on simule une recherche de l'utilisateur
    const user = null; // À remplacer par ton appel DB réel

    if (!user) {
      return res
        .status(401)
        .json({ message: "Identifiant ou mot de passe incorrect." });
    }

    // [RÈGLE DE SÉCURITÉ] : Si l'utilisateur est 'root', on peut bloquer sa connexion ici si demandé
    if (user.role === "root" || user.login === "root") {
      return res.status(403).json({ message: "Accès refusé pour ce compte." });
    }

    // 3. Vérification du mot de passe haché
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Identifiant ou mot de passe incorrect." });
    }

    // 4. Génération du Token JWT
    const token = jwt.sign(
      {
        userId: user.id,
        login: user.login,
        role: user.role,
        initials: user.initiales || "US",
      },
      process.env.JWT_SECRET || "SECRET_GMAO_DELTA_SA_2026", // Utilise une variable d'environnement !
      { expiresIn: "8h" }, // Le token expire après 8 heures
    );

    // 5. Réponse en cas de succès
    return res.status(200).json({
      message: "Connexion réussie",
      token,
      user: {
        login: user.login,
        role: user.role,
        initials: user.initiales || "US",
      },
    });
  } catch (error) {
    console.error("Erreur lors du login:", error);
    return res.status(500).json({
      message: "Une erreur interne est survenue lors de la connexion.",
    });
  }
};
