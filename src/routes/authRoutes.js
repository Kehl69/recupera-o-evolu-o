const express = require('express');
const router = express.Router();
const { mostrarLogin, fazerLogin, fazerLogout } = require('../controllers/authController');

// GET /login — mostra a tela de login
router.get('/login', mostrarLogin);

// POST /login — processa o formulário
router.post('/login', fazerLogin);

// GET /logout — destrói a sessão e sai
router.get('/logout', fazerLogout);

module.exports = router;
