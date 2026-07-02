const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const clienteController = require('../controllers/clienteController');

router.use(authMiddleware);

router.get('/', clienteController.listar);
router.get('/:id', clienteController.buscar);
router.post('/', clienteController.criar);
router.put('/:id', clienteController.atualizar);
router.delete('/:id', clienteController.remover);

module.exports = router;
