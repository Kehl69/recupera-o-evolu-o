const pedidoModel = require('../models/pedidoModel');

const listar = async (req, res) => {
  try {
    const pedidos = await pedidoModel.listarTodos();
    res.status(200).json({ sucesso: true, dados: pedidos });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar pedidos.' });
  }
};

const buscar = async (req, res) => {
  try {
    const pedido = await pedidoModel.buscarPorId(req.params.id);
    if (!pedido) {
      return res.status(404).json({ sucesso: false, mensagem: 'Pedido não encontrado.' });
    }
    res.status(200).json({ sucesso: true, dados: pedido });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao buscar pedido.' });
  }
};

// Corpo esperado:
// { "data": "2026-06-30", "clientes_id_cliente": 1, "itens": [{ "produtos_id_produto": 1, "quantidade": 2, "valor": 1259 }] }
const criar = async (req, res) => {
  try {
    const { data, clientes_id_cliente, itens } = req.body;
    if (!data || !clientes_id_cliente) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Campos obrigatórios: data, clientes_id_cliente.',
      });
    }
    const id = await pedidoModel.criar({ data, clientes_id_cliente, itens });
    res.status(201).json({ sucesso: true, mensagem: 'Pedido criado com sucesso.', id_pedido: id });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao criar pedido.' });
  }
};

const atualizar = async (req, res) => {
  try {
    const { data, clientes_id_cliente } = req.body;
    if (!data || !clientes_id_cliente) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Campos obrigatórios: data, clientes_id_cliente.',
      });
    }
    const linhasAfetadas = await pedidoModel.atualizar(req.params.id, { data, clientes_id_cliente });
    if (!linhasAfetadas) {
      return res.status(404).json({ sucesso: false, mensagem: 'Pedido não encontrado.' });
    }
    res.status(200).json({ sucesso: true, mensagem: 'Pedido atualizado com sucesso.' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao atualizar pedido.' });
  }
};

const remover = async (req, res) => {
  try {
    const linhasAfetadas = await pedidoModel.remover(req.params.id);
    if (!linhasAfetadas) {
      return res.status(404).json({ sucesso: false, mensagem: 'Pedido não encontrado.' });
    }
    res.status(200).json({ sucesso: true, mensagem: 'Pedido removido com sucesso.' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao remover pedido.' });
  }
};

module.exports = { listar, buscar, criar, atualizar, remover };
