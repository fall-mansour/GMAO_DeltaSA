// backend/src/routes/user.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Optionnel : Tu pourras y ajouter un middleware d'authentification (ex: authMiddleware) plus tard pour sécuriser l'accès à l'admin
router.get("/utilisateurs", userController.getAllUsers);
router.post("/utilisateurs", userController.createUser);
router.put("/utilisateurs/:id", userController.updateUser);
router.delete("/utilisateurs/:id", userController.deleteUser);

module.exports = router;
