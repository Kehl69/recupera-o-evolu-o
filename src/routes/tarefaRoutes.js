const express = require('express');
const router = express.Router();

const {
  listarTarefas,
  buscarTarefa,
  criarTarefa,
  atualizarTarefa,
  deletarTarefa,
} = require('../controllers/tarefaController');

const validarTarefa = require('../middlewares/validacao');

// Rotas do CRUD
router.get('/', listarTarefas);
router.get('/:id', buscarTarefa);
router.post('/', validarTarefa, criarTarefa);   // Middleware de validação antes de criar
router.put('/:id', atualizarTarefa);
router.delete('/:id', deletarTarefa);

module.exports = router;
