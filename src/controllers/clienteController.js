const clienteModel = require('../models/clienteModel');

const listar = async (req, res) => {
  try {
    const clientes = await clienteModel.listarTodos();
    res.status(200).json({ sucesso: true, dados: clientes });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar clientes.' });
  }
};

const buscar = async (req, res) => {
  try {
    const cliente = await clienteModel.buscarPorId(req.params.id);
    if (!cliente) {
      return res.status(404).json({ sucesso: false, mensagem: 'Cliente não encontrado.' });
    }
    res.status(200).json({ sucesso: true, dados: cliente });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao buscar cliente.' });
  }
};

const criar = async (req, res) => {
  try {
    const { nome, telefone, status } = req.body;
    if (!nome || !telefone) {
      return res.status(400).json({ sucesso: false, mensagem: 'Campos obrigatórios: nome, telefone.' });
    }
    const id = await clienteModel.criar({ nome, telefone, status });
    res.status(201).json({ sucesso: true, mensagem: 'Cliente criado com sucesso.', id_cliente: id });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao criar cliente.' });
  }
};

const atualizar = async (req, res) => {
  try {
    const { nome, telefone, status } = req.body;
    if (!nome || !telefone) {
      return res.status(400).json({ sucesso: false, mensagem: 'Campos obrigatórios: nome, telefone.' });
    }
    const linhasAfetadas = await clienteModel.atualizar(req.params.id, { nome, telefone, status });
    if (!linhasAfetadas) {
      return res.status(404).json({ sucesso: false, mensagem: 'Cliente não encontrado.' });
    }
    res.status(200).json({ sucesso: true, mensagem: 'Cliente atualizado com sucesso.' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao atualizar cliente.' });
  }
};

const remover = async (req, res) => {
  try {
    const linhasAfetadas = await clienteModel.remover(req.params.id);
    if (!linhasAfetadas) {
      return res.status(404).json({ sucesso: false, mensagem: 'Cliente não encontrado.' });
    }
    res.status(200).json({ sucesso: true, mensagem: 'Cliente removido com sucesso.' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao remover cliente.' });
  }
};

module.exports = { listar, buscar, criar, atualizar, remover };
