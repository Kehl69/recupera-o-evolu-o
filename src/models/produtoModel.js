const { pool } = require('../config/database');

const listarTodos = async () => {
  const [linhas] = await pool.query(
    `SELECT p.id_produto, p.nome, p.valor, p.estoque, p.categorias_id_categoria,
            c.nome AS categoria_nome
     FROM produtos p
     JOIN categorias c ON c.id_categoria = p.categorias_id_categoria
     ORDER BY p.id_produto`
  );
  return linhas;
};

const buscarPorId = async (id) => {
  const [linhas] = await pool.query(
    `SELECT p.id_produto, p.nome, p.valor, p.estoque, p.categorias_id_categoria,
            c.nome AS categoria_nome
     FROM produtos p
     JOIN categorias c ON c.id_categoria = p.categorias_id_categoria
     WHERE p.id_produto = ?`,
    [id]
  );
  return linhas[0] || null;
};

const criar = async ({ nome, valor, estoque, categorias_id_categoria }) => {
  const [resultado] = await pool.query(
    'INSERT INTO produtos (nome, valor, estoque, categorias_id_categoria) VALUES (?, ?, ?, ?)',
    [nome, valor, estoque, categorias_id_categoria]
  );
  return resultado.insertId;
};

const atualizar = async (id, { nome, valor, estoque, categorias_id_categoria }) => {
  const [resultado] = await pool.query(
    'UPDATE produtos SET nome = ?, valor = ?, estoque = ?, categorias_id_categoria = ? WHERE id_produto = ?',
    [nome, valor, estoque, categorias_id_categoria, id]
  );
  return resultado.affectedRows;
};

const remover = async (id) => {
  const [resultado] = await pool.query(
    'DELETE FROM produtos WHERE id_produto = ?',
    [id]
  );
  return resultado.affectedRows;
};

module.exports = { listarTodos, buscarPorId, criar, atualizar, remover };
