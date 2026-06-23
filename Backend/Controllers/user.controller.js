// backend/src/controllers/user.controller.js
const bcrypt = require("bcrypt");
const db = require("../db"); // Ton pool ou connexion mysql2

// Fonction utilitaire pour mapper les rôles du Frontend vers l'ENUM MySQL
const mapRoleToEnum = (frontendRole) => {
  const mapping = {
    admin: "admin",
    responsable: "responsable_maintenance",
    backoffice: "responsable_backoffice",
    mecanicien: "mecanicien",
    chauffeur: "chauffeur",
  };
  return mapping[frontendRole] || "chauffeur";
};

/**
 * 1. LIRE LES UTILISATEURS (Exclut le mail 'root@...' si présent)
 */
exports.getAllUsers = async (req, res) => {
  try {
    // Modification : On utilise email à la place de login, et mot_de_passe est exclu
    const queryText = `
      SELECT id, nom, prenom, email, role 
      FROM utilisateurs 
      WHERE LOWER(email) NOT LIKE 'root%' AND LOWER(role) != 'admin'
      ORDER BY nom ASC, prenom ASC
    `;

    // Si tu utilises mysql2 (db.execute ou db.query renvoie [rows, fields])
    const [users] = await db.query(queryText);

    // On réadapte la structure pour que le frontend React (qui cherche .login) ne plante pas
    const adaptedUsers = users.map((u) => ({
      id: u.id,
      nom: u.nom,
      prenom: u.prenom,
      email: u.email,
      login: u.email.split("@")[0], // Génère un login virtuel basé sur l'email pour l'affichage
      role:
        u.role === "responsable_maintenance"
          ? "responsable"
          : u.role === "responsable_backoffice"
            ? "backoffice"
            : u.role,
    }));

    return res.status(200).json(adaptedUsers);
  } catch (error) {
    console.error("Erreur SQL getAllUsers :", error);
    return res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs." });
  }
};

/**
 * 2. CRÉER UN UTILISATEUR
 */
exports.createUser = async (req, res) => {
  try {
    const { nom, prenom, email, motDePasse, role } = req.body;

    if (!nom || !prenom || !email || !motDePasse || !role) {
      return res
        .status(400)
        .json({ message: "Tous les champs sont obligatoires." });
    }

    const sanitizedEmail = email.toLowerCase().trim();
    if (sanitizedEmail.startsWith("root")) {
      return res.status(403).json({ message: "Action non autorisée." });
    }

    // Hashage du mot de passe
    const saltRounds = 10;
    const hash = await bcrypt.hash(motDePasse, saltRounds);

    // Correspondance avec l'ENUM MySQL
    const mysqlRole = mapRoleToEnum(role);

    const insertQuery = `
      INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role)
      VALUES (?, ?, ?, ?, ?)
    `;

    await db.query(insertQuery, [nom, prenom, sanitizedEmail, hash, mysqlRole]);

    return res.status(201).json({ message: "Utilisateur créé avec succès." });
  } catch (error) {
    console.error("Erreur SQL createUser :", error);
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({ message: "Cette adresse email est déjà utilisée." });
    }
    return res
      .status(500)
      .json({ message: "Erreur lors de la création de l'utilisateur." });
  }
};

/**
 * 3. MODIFIER UN UTILISATEUR
 */
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, email, motDePasse, role } = req.body;

    const sanitizedEmail = email.toLowerCase().trim();
    if (sanitizedEmail.startsWith("root")) {
      return res.status(403).json({ message: "Modification interdite." });
    }

    const mysqlRole = mapRoleToEnum(role);

    if (motDePasse && motDePasse.trim() !== "") {
      const saltRounds = 10;
      const hash = await bcrypt.hash(motDePasse, saltRounds);

      const query = `
        UPDATE utilisateurs 
        SET nom = ?, prenom = ?, email = ?, mot_de_passe = ?, role = ?
        WHERE id = ?
      `;
      await db.query(query, [nom, prenom, sanitizedEmail, hash, mysqlRole, id]);
    } else {
      const query = `
        UPDATE utilisateurs 
        SET nom = ?, prenom = ?, email = ?, role = ?
        WHERE id = ?
      `;
      await db.query(query, [nom, prenom, sanitizedEmail, mysqlRole, id]);
    }

    return res
      .status(200)
      .json({ message: "Utilisateur mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur SQL updateUser :", error);
    return res.status(500).json({ message: "Erreur lors de la modification." });
  }
};

/**
 * 4. SUPPRIMER UN UTILISATEUR
 */
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const query = "DELETE FROM utilisateurs WHERE id = ?";
    await db.query(query, [id]);

    return res
      .status(200)
      .json({ message: "Utilisateur supprimé avec succès." });
  } catch (error) {
    console.error("Erreur SQL deleteUser :", error);
    return res.status(500).json({ message: "Erreur lors de la suppression." });
  }
};
