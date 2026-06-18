// Middleware de Validação — garante que o título foi enviado no body
const validarTarefa = (req, res, next) => {
  const { titulo } = req.body;

  if (!titulo || titulo.trim() === '') {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'O campo "titulo" é obrigatório e não pode estar vazio.',
    });
  }

  next();
};

module.exports = validarTarefa;
