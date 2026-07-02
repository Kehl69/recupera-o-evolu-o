const { pool } = require('../config/database');

const listarTodos = async () => {
  const [linhas] = await pool.query(
    'SELECT id_cliente, nome, telefone, status FROM clientes ORDER BY id_cliente'
  );
  return linhas;
};

const buscarPorId = async (id) => {
  const [linhas] = await pool.query(
    'SELECT id_cliente, nome, telefone, status FROM clientes WHERE id_cliente = ?',
    [id]
  );
  return linhas[0] || null;
};

const criar = async ({ nome, telefone, status }) => {
  const [resultado] = await pool.query(
    'INSERT INTO clientes (nome, telefone, status) VALUES (?, ?, ?)',
    [nome, telefone, status || 'medio']
  );
  return resultado.insertId;
};

const atualizar = async (id, { nome, telefone, status }) => {
  const [resultado] = await pool.query(
    'UPDATE clientes SET nome = ?, telefone = ?, status = ? WHERE id_cliente = ?',
    [nome, telefone, status, id]
  );
  return resultado.affectedRows;
};

const remover = async (id) => {
  const [resultado] = await pool.query(
    'DELETE FROM clientes WHERE id_cliente = ?',
    [id]
  );
  return resultado.affectedRows;
};

module.exports = { listarTodos, buscarPorId, criar, atualizar, remover };
