const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Mostra a página de login
const mostrarLogin = (req, res) => {
  // Se já está logado, manda direto pro sistema
  if (req.session.usuario) {
    return res.redirect('/');
  }
  res.sendFile(require('path').join(__dirname, '../../public', 'login.html'));
};

// Processa o formulário de login
const fazerLogin = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Procura o usuário pelo email no banco
    const usuario = await User.findOne({ email });

    // Se não achou o usuário
    if (!usuario) {
      return res.redirect('/login?erro=credenciais');
    }

    // Compara a senha digitada com a senha criptografada no banco
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.redirect('/login?erro=credenciais');
    }

    // Login OK! Salva o usuário na sessão
    req.session.usuario = {
      id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
    };

    // Manda para a página principal
    res.redirect('/');

  } catch (erro) {
    console.error('Erro no login:', erro);
    res.redirect('/login?erro=servidor');
  }
};

// Faz o logout destruindo a sessão
const fazerLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erro ao destruir sessão:', err);
    }
    // Limpa o cookie do navegador e manda pro login
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
};

module.exports = { mostrarLogin, fazerLogin, fazerLogout };
