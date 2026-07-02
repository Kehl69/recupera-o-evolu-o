const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const produtoController = require('../controllers/produtoController');

router.use(authMiddleware);

router.get('/', produtoController.listar);
router.get('/:id', produtoController.buscar);
router.post('/', produtoController.criar);
router.put('/:id', produtoController.atualizar);
router.delete('/:id', produtoController.remover);

module.exports = router;
