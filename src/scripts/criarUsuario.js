// Script para criar um usuário de teste no banco
// Rode uma vez com: node src/scripts/criarUsuario.js

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function criarUsuario() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Conectado ao banco!');

  // Criptografa a senha antes de salvar
  const senhaCriptografada = await bcrypt.hash('123456', 10);

  const usuario = await User.create({
    nome: 'Administrador',
    email: 'admin@taskflow.com',
    senha: senhaCriptografada,
  });

  console.log('✅ Usuário criado:', usuario.email);
  console.log('   Senha: 123456');
  
  mongoose.disconnect();
}

criarUsuario().catch(console.error);
