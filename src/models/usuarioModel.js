const { pool } = require('../config/database');

// Busca um usuário pelo nick (login). Usa Prepared Statement (?).
const buscarPorNick = async (nick) => {
  const [linhas] = await pool.query(
    'SELECT id_usuario, nome, nick, senha FROM usuarios WHERE nick = ? LIMIT 1',
    [nick]
  );
  return linhas[0] || null;
};

// Busca um usuário pelo ID.
const buscarPorId = async (id_usuario) => {
  const [linhas] = await pool.query(
    'SELECT id_usuario, nome, nick FROM usuarios WHERE id_usuario = ? LIMIT 1',
    [id_usuario]
  );
  return linhas[0] || null;
};

// Cria um novo usuário (usado pelo script criarUsuario.js para gerar usuários de teste).
const criar = async (nome, nick, senhaHash) => {
  const [resultado] = await pool.query(
    'INSERT INTO usuarios (nome, nick, senha) VALUES (?, ?, ?)',
    [nome, nick, senhaHash]
  );
  return resultado.insertId;
};

module.exports = { buscarPorNick, buscarPorId, criar };
