const { pool } = require('../config/database');

// Busca um usuário pelo e-mail
const buscarPorEmail = async (email) => {
  const [rows] = await pool.query(
    'SELECT id_usuario, nome, email, senha FROM usuarios WHERE email = ? LIMIT 1',
    [email]
  );

  return rows[0] || null;
};

// Busca um usuário pelo ID
const buscarPorId = async (id_usuario) => {
  const [rows] = await pool.query(
    'SELECT id_usuario, nome, email FROM usuarios WHERE id_usuario = ? LIMIT 1',
    [id_usuario]
  );

  return rows[0] || null;
};

// Cria um novo usuário
const criar = async (nome, email, senhaHash) => {
  const [resultado] = await pool.query(
    'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
    [nome, email, senhaHash]
  );

  return resultado.insertId;
};

module.exports = {
  buscarPorEmail,
  buscarPorId,
  criar
};