const mongoose = require('mongoose');

// Schema do usuário — só precisa de email e senha por enquanto
const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Não pode ter dois usuários com o mesmo email
  },
  senha: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
