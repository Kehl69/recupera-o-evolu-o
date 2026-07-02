const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota pública de autenticação
router.post('/api/login', authController.fazerLogin);

module.exports = router;
