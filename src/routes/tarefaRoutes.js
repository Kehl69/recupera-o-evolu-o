const express = require('express');
const router = express.Router();

const {
  listarTarefas,
  buscarTarefa,
  criarTarefa,
  atualizarTarefa,
  deletarTarefa,
  renderizarTarefas
} = require('../controllers/tarefaController');

const validarTarefa = require('../middlewares/validacao');

// View EJS
router.get('/view', renderizarTarefas);

// CRUD
router.get('/', listarTarefas);
router.get('/:id', buscarTarefa);
router.post('/', validarTarefa, criarTarefa);
router.put('/:id', atualizarTarefa);
router.delete('/:id', deletarTarefa);

module.exports = router;