const Tarefa = require('../models/Tarefa');

/**
 * Lista todas as tarefas cadastradas.
 * @param {import('express').Request} req Objeto da requisição HTTP.
 * @param {import('express').Response} res Objeto da resposta HTTP.
 * @returns {Promise<void>}
 */
const listarTarefas = async (req, res) => {
  try {
    const tarefas = await Tarefa.find().sort({ createdAt: -1 });

    res.status(200).json({
      sucesso: true,
      total: tarefas.length,
      dados: tarefas
    });

  } catch (erro) {

    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno ao buscar tarefas',
      erro: erro.message
    });

  }
};

/**
 * Busca uma tarefa pelo ID.
 * @param {import('express').Request} req Requisição contendo o ID.
 * @param {import('express').Response} res Resposta HTTP.
 * @returns {Promise<void>}
 */
const buscarTarefa = async (req, res) => {
  try {

    const tarefa = await Tarefa.findById(req.params.id);

    if (!tarefa) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Tarefa não encontrada'
      });
    }

    res.status(200).json({
      sucesso: true,
      dados: tarefa
    });

  } catch (erro) {

    res.status(400).json({
      sucesso: false,
      mensagem: 'ID inválido ou erro ao buscar tarefa',
      erro: erro.message
    });

  }
};

/**
 * Cria uma nova tarefa no banco de dados.
 * @param {import('express').Request} req Dados enviados no body.
 * @param {import('express').Response} res Resposta HTTP.
 * @returns {Promise<void>}
 */
const criarTarefa = async (req, res) => {
  try {

    const { titulo, descricao, prioridade } = req.body;

    const novaTarefa = await Tarefa.create({
      titulo,
      descricao,
      prioridade
    });

    res.status(201).json({
      sucesso: true,
      mensagem: 'Tarefa criada com sucesso!',
      dados: novaTarefa
    });

  } catch (erro) {

    res.status(400).json({
      sucesso: false,
      mensagem: 'Erro ao criar tarefa',
      erro: erro.message
    });

  }
};

/**
 * Atualiza uma tarefa existente.
 * @param {import('express').Request} req Requisição contendo ID e dados.
 * @param {import('express').Response} res Resposta HTTP.
 * @returns {Promise<void>}
 */
const atualizarTarefa = async (req, res) => {
  try {

    const tarefa = await Tarefa.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!tarefa) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Tarefa não encontrada para atualizar'
      });
    }

    res.status(200).json({
      sucesso: true,
      mensagem: 'Tarefa atualizada!',
      dados: tarefa
    });

  } catch (erro) {

    res.status(400).json({
      sucesso: false,
      mensagem: 'Erro ao atualizar tarefa',
      erro: erro.message
    });

  }
};

/**
 * Remove uma tarefa do banco de dados.
 * @param {import('express').Request} req Requisição contendo ID.
 * @param {import('express').Response} res Resposta HTTP.
 * @returns {Promise<void>}
 */
const deletarTarefa = async (req, res) => {
  try {

    const tarefa = await Tarefa.findByIdAndDelete(req.params.id);

    if (!tarefa) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Tarefa não encontrada para deletar'
      });
    }

    res.status(200).json({
      sucesso: true,
      mensagem: 'Tarefa deletada com sucesso'
    });

  } catch (erro) {

    res.status(400).json({
      sucesso: false,
      mensagem: 'Erro ao deletar tarefa',
      erro: erro.message
    });

  }
};

/**
 * Renderiza uma página EJS contendo todas as tarefas cadastradas.
 *
 * @param {import('express').Request} req Objeto da requisição HTTP.
 * @param {import('express').Response} res Objeto da resposta HTTP.
 * @returns {Promise<void>}
 */
const renderizarTarefas = async (req, res) => {
  try {

    const tarefas = await Tarefa.find().sort({
      createdAt: -1
    });

    res.render('productView', {
      tarefas
    });

  } catch (erro) {

    res.status(500).send('Erro ao carregar tarefas');

  }
};

module.exports = {
  listarTarefas,
  buscarTarefa,
  criarTarefa,
  atualizarTarefa,
  deletarTarefa,
  renderizarTarefas
};