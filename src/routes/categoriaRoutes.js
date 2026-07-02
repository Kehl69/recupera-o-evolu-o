const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const categoriaController = require('../controllers/categoriaController');

// Todas as rotas abaixo exigem token válido + x-user-id correspondente
router.use(authMiddleware);

router.get('/', categoriaController.listar);
router.get('/:id', categoriaController.buscar);
router.post('/', categoriaController.criar);
router.put('/:id', categoriaController.atualizar);
router.delete('/:id', categoriaController.remover);

module.exports = router;
