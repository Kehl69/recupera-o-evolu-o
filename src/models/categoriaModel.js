const { pool } = require('../config/database');

const listarTodas = async () => {
  const [linhas] = await pool.query('SELECT id_categoria, nome FROM categorias ORDER BY id_categoria');
  return linhas;
};

const buscarPorId = async (id) => {
  const [linhas] = await pool.query(
    'SELECT id_categoria, nome FROM categorias WHERE id_categoria = ?',
    [id]
  );
  return linhas[0] || null;
};

const criar = async (nome) => {
  const [resultado] = await pool.query(
    'INSERT INTO categorias (nome) VALUES (?)',
    [nome]
  );
  return resultado.insertId;
};

const atualizar = async (id, nome) => {
  const [resultado] = await pool.query(
    'UPDATE categorias SET nome = ? WHERE id_categoria = ?',
    [nome, id]
  );
  return resultado.affectedRows;
};

const remover = async (id) => {
  const [resultado] = await pool.query(
    'DELETE FROM categorias WHERE id_categoria = ?',
    [id]
  );
  return resultado.affectedRows;
};

module.exports = { listarTodas, buscarPorId, criar, atualizar, remover };
