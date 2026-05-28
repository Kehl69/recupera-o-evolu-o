const Tarefa = require('../models/Tarefa');

// GET /api/tarefas - Lista todas as tarefas
const listarTarefas = async (req, res) => {
  try {
    const tarefas = await Tarefa.find().sort({ createdAt: -1 });
    res.status(200).json({
      sucesso: true,
      total: tarefas.length,
      dados: tarefas,
    });
  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno ao buscar tarefas',
      erro: erro.message,
    });
  }
};

// GET /api/tarefas/:id - Busca uma tarefa pelo ID
const buscarTarefa = async (req, res) => {
  try {
    const tarefa = await Tarefa.findById(req.params.id);

    if (!tarefa) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Tarefa não encontrada',
      });
    }

    res.status(200).json({ sucesso: true, dados: tarefa });
  } catch (erro) {
    // ID com formato inválido cai aqui
    res.status(400).json({
      sucesso: false,
      mensagem: 'ID inválido ou erro ao buscar tarefa',
      erro: erro.message,
    });
  }
};

// POST /api/tarefas - Cria uma nova tarefa
const criarTarefa = async (req, res) => {
  try {
    const { titulo, descricao, prioridade } = req.body;
    const novaTarefa = await Tarefa.create({ titulo, descricao, prioridade });

    res.status(201).json({
      sucesso: true,
      mensagem: 'Tarefa criada com sucesso!',
      dados: novaTarefa,
    });
  } catch (erro) {
    // Erros de validação do Mongoose chegam aqui
    res.status(400).json({
      sucesso: false,
      mensagem: 'Erro ao criar tarefa',
      erro: erro.message,
    });
  }
};

// PUT /api/tarefas/:id - Atualiza uma tarefa existente
const atualizarTarefa = async (req, res) => {
  try {
    const tarefa = await Tarefa.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,          // Retorna o documento atualizado
        runValidators: true, // Roda as validações do schema
      }
    );

    if (!tarefa) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Tarefa não encontrada para atualizar',
      });
    }

    res.status(200).json({
      sucesso: true,
      mensagem: 'Tarefa atualizada!',
      dados: tarefa,
    });
  } catch (erro) {
    res.status(400).json({
      sucesso: false,
      mensagem: 'Erro ao atualizar tarefa',
      erro: erro.message,
    });
  }
};

// DELETE /api/tarefas/:id - Remove uma tarefa
const deletarTarefa = async (req, res) => {
  try {
    const tarefa = await Tarefa.findByIdAndDelete(req.params.id);

    if (!tarefa) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Tarefa não encontrada para deletar',
      });
    }

    res.status(200).json({
      sucesso: true,
      mensagem: 'Tarefa deletada com sucesso',
    });
  } catch (erro) {
    res.status(400).json({
      sucesso: false,
      mensagem: 'Erro ao deletar tarefa',
      erro: erro.message,
    });
  }
};

module.exports = {
  listarTarefas,
  buscarTarefa,
  criarTarefa,
  atualizarTarefa,
  deletarTarefa,
};
