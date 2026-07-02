const produtoModel = require('../models/produtoModel');

const listar = async (req, res) => {
  try {
    const produtos = await produtoModel.listarTodos();
    res.status(200).json({ sucesso: true, dados: produtos });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar produtos.' });
  }
};

const buscar = async (req, res) => {
  try {
    const produto = await produtoModel.buscarPorId(req.params.id);
    if (!produto) {
      return res.status(404).json({ sucesso: false, mensagem: 'Produto não encontrado.' });
    }
    res.status(200).json({ sucesso: true, dados: produto });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao buscar produto.' });
  }
};

const criar = async (req, res) => {
  try {
    const { nome, valor, estoque, categorias_id_categoria } = req.body;
    if (!nome || valor === undefined || !categorias_id_categoria) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Campos obrigatórios: nome, valor, categorias_id_categoria.',
      });
    }
    const id = await produtoModel.criar({
      nome, valor, estoque: estoque ?? 1, categorias_id_categoria,
    });
    res.status(201).json({ sucesso: true, mensagem: 'Produto criado com sucesso.', id_produto: id });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao criar produto.' });
  }
};

const atualizar = async (req, res) => {
  try {
    const { nome, valor, estoque, categorias_id_categoria } = req.body;
    if (!nome || valor === undefined || !categorias_id_categoria) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Campos obrigatórios: nome, valor, categorias_id_categoria.',
      });
    }
    const linhasAfetadas = await produtoModel.atualizar(req.params.id, {
      nome, valor, estoque: estoque ?? 1, categorias_id_categoria,
    });
    if (!linhasAfetadas) {
      return res.status(404).json({ sucesso: false, mensagem: 'Produto não encontrado.' });
    }
    res.status(200).json({ sucesso: true, mensagem: 'Produto atualizado com sucesso.' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao atualizar produto.' });
  }
};

const remover = async (req, res) => {
  try {
    const linhasAfetadas = await produtoModel.remover(req.params.id);
    if (!linhasAfetadas) {
      return res.status(404).json({ sucesso: false, mensagem: 'Produto não encontrado.' });
    }
    res.status(200).json({ sucesso: true, mensagem: 'Produto removido com sucesso.' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao remover produto.' });
  }
};

module.exports = { listar, buscar, criar, atualizar, remover };
