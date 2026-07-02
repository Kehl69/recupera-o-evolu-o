const { pool } = require('../config/database');

// Lista todos os pedidos com dados básicos do cliente
const listarTodos = async () => {
  const [linhas] = await pool.query(
    `SELECT pd.id_pedido, pd.data, pd.clientes_id_cliente, c.nome AS cliente_nome
     FROM pedidos pd
     JOIN clientes c ON c.id_cliente = pd.clientes_id_cliente
     ORDER BY pd.id_pedido`
  );
  return linhas;
};

// Busca um pedido + seus itens (tabela produtos_pedidos)
const buscarPorId = async (id) => {
  const [pedidos] = await pool.query(
    `SELECT pd.id_pedido, pd.data, pd.clientes_id_cliente, c.nome AS cliente_nome
     FROM pedidos pd
     JOIN clientes c ON c.id_cliente = pd.clientes_id_cliente
     WHERE pd.id_pedido = ?`,
    [id]
  );

  const pedido = pedidos[0];
  if (!pedido) return null;

  const [itens] = await pool.query(
    `SELECT pp.produtos_id_produto, p.nome AS produto_nome, pp.quantidade, pp.valor
     FROM produtos_pedidos pp
     JOIN produtos p ON p.id_produto = pp.produtos_id_produto
     WHERE pp.pedidos_id_pedido = ?`,
    [id]
  );

  pedido.itens = itens;
  return pedido;
};

// Cria um pedido e seus itens em uma transação (tudo ou nada)
const criar = async ({ data, clientes_id_cliente, itens }) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [resultadoPedido] = await conn.query(
      'INSERT INTO pedidos (data, clientes_id_cliente) VALUES (?, ?)',
      [data, clientes_id_cliente]
    );
    const idPedido = resultadoPedido.insertId;

    if (Array.isArray(itens)) {
      for (const item of itens) {
        await conn.query(
          'INSERT INTO produtos_pedidos (produtos_id_produto, pedidos_id_pedido, quantidade, valor) VALUES (?, ?, ?, ?)',
          [item.produtos_id_produto, idPedido, item.quantidade, item.valor]
        );
      }
    }

    await conn.commit();
    return idPedido;
  } catch (erro) {
    await conn.rollback();
    throw erro;
  } finally {
    conn.release();
  }
};

// Atualiza apenas os dados do pedido (data / cliente)
const atualizar = async (id, { data, clientes_id_cliente }) => {
  const [resultado] = await pool.query(
    'UPDATE pedidos SET data = ?, clientes_id_cliente = ? WHERE id_pedido = ?',
    [data, clientes_id_cliente, id]
  );
  return resultado.affectedRows;
};

// Remove o pedido e seus itens (transação)
const remover = async (id) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query('DELETE FROM produtos_pedidos WHERE pedidos_id_pedido = ?', [id]);
    const [resultado] = await conn.query('DELETE FROM pedidos WHERE id_pedido = ?', [id]);
    await conn.commit();
    return resultado.affectedRows;
  } catch (erro) {
    await conn.rollback();
    throw erro;
  } finally {
    conn.release();
  }
};

module.exports = { listarTodos, buscarPorId, criar, atualizar, remover };
