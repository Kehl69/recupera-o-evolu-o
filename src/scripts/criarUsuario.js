/**
 * Script utilitário para criar um usuário de teste diretamente no MySQL.
 * Use isso para gerar um login com senha conhecida, já que o usuário
 * "candido" que veio na base original tem senha em hash MD5 legado
 * (não temos a senha em texto puro).
 *
 * Como usar:
 *   node src/scripts/criarUsuario.js "Nome Completo" "nickdousuario" "senha123"
 */
require('dotenv').config();
const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');
const usuarioModel = require('../models/usuarioModel');

const main = async () => {
  const [, , nome, nick, senha] = process.argv;

  if (!nome || !nick || !senha) {
    console.log('Uso: node src/scripts/criarUsuario.js "Nome Completo" "nick" "senha"');
    process.exit(1);
  }

  try {
    const existente = await usuarioModel.buscarPorNick(nick);
    if (existente) {
      console.log(`❌ Já existe um usuário com o nick "${nick}".`);
      process.exit(1);
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const id = await usuarioModel.criar(nome, nick, senhaHash);

    console.log(`✅ Usuário criado com sucesso! id_usuario=${id}, nick="${nick}"`);
    console.log('Agora você pode logar em POST /api/login com esse nick/senha.');
  } catch (erro) {
    console.error('Erro ao criar usuário:', erro.message);
  } finally {
    await pool.end();
  }
};

main();
