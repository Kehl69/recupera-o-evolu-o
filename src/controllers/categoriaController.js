const categoriaModel = require('../models/categoriaModel');

const listar = async (req, res) => {
  try {
    const categorias = await categoriaModel.listarTodas();
    res.status(200).json({ sucesso: true, dados: categorias });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar categorias.' });
  }
};

const buscar = async (req, res) => {
  try {
    const categoria = await categoriaModel.buscarPorId(req.params.id);
    if (!categoria) {
      return res.status(404).json({ sucesso: false, mensagem: 'Categoria não encontrada.' });
    }
    res.status(200).json({ sucesso: true, dados: categoria });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao buscar categoria.' });
  }
};

const criar = async (req, res) => {
  try {
    const { nome } = req.body;
    if (!nome) {
      return res.status(400).json({ sucesso: false, mensagem: 'O campo "nome" é obrigatório.' });
    }
    const id = await categoriaModel.criar(nome);
    res.status(201).json({ sucesso: true, mensagem: 'Categoria criada com sucesso.', id_categoria: id });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao criar categoria.' });
  }
};

const atualizar = async (req, res) => {
  try {
    const { nome } = req.body;
    if (!nome) {
      return res.status(400).json({ sucesso: false, mensagem: 'O campo "nome" é obrigatório.' });
    }
    const linhasAfetadas = await categoriaModel.atualizar(req.params.id, nome);
    if (!linhasAfetadas) {
      return res.status(404).json({ sucesso: false, mensagem: 'Categoria não encontrada.' });
    }
    res.status(200).json({ sucesso: true, mensagem: 'Categoria atualizada com sucesso.' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao atualizar categoria.' });
  }
};

const remover = async (req, res) => {
  try {
    const linhasAfetadas = await categoriaModel.remover(req.params.id);
    if (!linhasAfetadas) {
      return res.status(404).json({ sucesso: false, mensagem: 'Categoria não encontrada.' });
    }
    res.status(200).json({ sucesso: true, mensagem: 'Categoria removida com sucesso.' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao remover categoria.' });
  }
};

module.exports = { listar, buscar, criar, atualizar, remover };
