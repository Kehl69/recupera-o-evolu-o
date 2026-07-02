const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const categoriaController = require('../controllers/categoriaController');

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Gerenciamento de categorias
 */

router.use(authMiddleware);

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', categoriaController.listar);

/**
 * @swagger
 * /api/categorias/{id}:
 *   get:
 *     summary: Busca categoria por ID
 *     tags: [Categorias]
 */
router.get('/:id', categoriaController.buscar);

/**
 * @swagger
 * /api/categorias:
 *   post:
 *     summary: Cria uma categoria
 *     tags: [Categorias]
 */
router.post('/', categoriaController.criar);

/**
 * @swagger
 * /api/categorias/{id}:
 *   put:
 *     summary: Atualiza uma categoria
 *     tags: [Categorias]
 */
router.put('/:id', categoriaController.atualizar);

/**
 * @swagger
 * /api/categorias/{id}:
 *   delete:
 *     summary: Remove uma categoria
 *     tags: [Categorias]
 */
router.delete('/:id', categoriaController.remover);

module.exports = router;