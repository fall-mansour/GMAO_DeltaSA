// Backend/src/routes/login.js
const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login.controller");

/**
 * @route   POST /api/auth/login
 * @desc    Authentifier un utilisateur & retourner un Token JWT
 * @access  Public
 */
router.post("/login", loginController.login);

module.exports = router;
