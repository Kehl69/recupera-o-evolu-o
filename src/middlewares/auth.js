// Middleware de Autenticação
// Ele vai "interceptar" toda requisição antes de chegar nas rotas protegidas

const authMiddleware = (req, res, next) => {
  // Verifica se existe um usuário salvo na sessão
  if (req.session && req.session.usuario) {
    // Tem usuário logado! Pode passar.
    next();
  } else {
    // Não tem sessão — manda para o login
    res.redirect('/login');
  }
};

module.exports = authMiddleware;
