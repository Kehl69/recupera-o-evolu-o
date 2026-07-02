const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const pedidoController = require('../controllers/pedidoController');

router.use(authMiddleware);

router.get('/', pedidoController.listar);
router.get('/:id', pedidoController.buscar);
router.post('/', pedidoController.criar);
router.put('/:id', pedidoController.atualizar);
router.delete('/:id', pedidoController.remover);

module.exports = router;
