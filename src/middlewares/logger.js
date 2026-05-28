// Middleware de Log — registra toda requisição que chega no servidor
const loggerMiddleware = (req, res, next) => {
  const agora = new Date().toLocaleString('pt-BR');
  console.log(`[${agora}] ${req.method} ${req.url}`);
  next(); // Chama o próximo middleware ou rota
};

module.exports = loggerMiddleware;
