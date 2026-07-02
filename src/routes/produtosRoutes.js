const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const produtoController = require('../controllers/produtoController');

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Gerenciamento de produtos
 */

router.use(authMiddleware);

/**
 * @swagger
 * /api/produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', produtoController.listar);

/**
 * @swagger
 * /api/produtos/{id}:
 *   get:
 *     summary: Busca produto por ID
 *     tags: [Produtos]
 */
router.get('/:id', produtoController.buscar);

/**
 * @swagger
 * /api/produtos:
 *   post:
 *     summary: Cria um produto
 *     tags: [Produtos]
 */
router.post('/', produtoController.criar);

/**
 * @swagger
 * /api/produtos/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Produtos]
 */
router.put('/:id', produtoController.atualizar);

/**
 * @swagger
 * /api/produtos/{id}:
 *   delete:
 *     summary: Remove um produto
 *     tags: [Produtos]
 */
router.delete('/:id', produtoController.remover);

module.exports = router;