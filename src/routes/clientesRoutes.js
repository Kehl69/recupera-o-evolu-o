const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const clienteController = require('../controllers/clienteController');

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Gerenciamento de clientes
 */

router.use(authMiddleware);

/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', clienteController.listar);

/**
 * @swagger
 * /api/clientes/{id}:
 *   get:
 *     summary: Busca cliente por ID
 *     tags: [Clientes]
 */
router.get('/:id', clienteController.buscar);

/**
 * @swagger
 * /api/clientes:
 *   post:
 *     summary: Cria um cliente
 *     tags: [Clientes]
 */
router.post('/', clienteController.criar);

/**
 * @swagger
 * /api/clientes/{id}:
 *   put:
 *     summary: Atualiza um cliente
 *     tags: [Clientes]
 */
router.put('/:id', clienteController.atualizar);

/**
 * @swagger
 * /api/clientes/{id}:
 *   delete:
 *     summary: Remove um cliente
 *     tags: [Clientes]
 */
router.delete('/:id', clienteController.remover);

module.exports = router;