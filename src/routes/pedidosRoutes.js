const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const pedidoController = require('../controllers/pedidoController');

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Gerenciamento de pedidos
 */

router.use(authMiddleware);

/**
 * @swagger
 * /api/pedidos:
 *   get:
 *     summary: Lista todos os pedidos
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', pedidoController.listar);

/**
 * @swagger
 * /api/pedidos/{id}:
 *   get:
 *     summary: Busca pedido por ID
 *     tags: [Pedidos]
 */
router.get('/:id', pedidoController.buscar);

/**
 * @swagger
 * /api/pedidos:
 *   post:
 *     summary: Cria um pedido
 *     tags: [Pedidos]
 */
router.post('/', pedidoController.criar);

/**
 * @swagger
 * /api/pedidos/{id}:
 *   put:
 *     summary: Atualiza um pedido
 *     tags: [Pedidos]
 */
router.put('/:id', pedidoController.atualizar);

/**
 * @swagger
 * /api/pedidos/{id}:
 *   delete:
 *     summary: Remove um pedido
 *     tags: [Pedidos]
 */
router.delete('/:id', pedidoController.remover);

module.exports = router;