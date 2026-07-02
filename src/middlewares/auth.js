const jwt = require('jsonwebtoken');

const SEGREDO = process.env.JWT_SECRET || 'taskflow-segredo-123';

/**
 * Middleware de autenticação por TOKEN para a API REST.
 *
 * Regra de segurança exigida pelo desafio:
 *  1) Deve existir uma chave/token de usuário válida (Authorization: Bearer <token>).
 *  2) O ID do usuário correspondente deve estar EXPLICITAMENTE informado na
 *     requisição (cabeçalho "x-user-id") e ele precisa bater com o ID que
 *     está codificado dentro do próprio token.
 *
 * Se qualquer uma dessas condições falhar, a requisição é barrada com 401/403
 * ANTES de chegar nos controllers.
 */
const authMiddleware = (req, res, next) => {
  // 1. Extrai o token do cabeçalho Authorization: Bearer <token>
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : null;

  if (!token) {
    return res.status(401).json({
      sucesso: false,
      mensagem: 'Acesso negado: token de usuário não informado.',
    });
  }

  // 2. Extrai o ID do usuário explicitamente informado na requisição
  const idInformado = req.headers['x-user-id'] || req.body?.id_usuario || req.query?.id_usuario;

  if (!idInformado) {
    return res.status(401).json({
      sucesso: false,
      mensagem: 'Acesso negado: ID do usuário não informado na requisição (use o cabeçalho x-user-id).',
    });
  }

  // 3. Valida o token
  let payload;
  try {
    payload = jwt.verify(token, SEGREDO);
  } catch (erro) {
    return res.status(401).json({
      sucesso: false,
      mensagem: 'Acesso negado: token inválido ou expirado.',
    });
  }

  // 4. Confere se o ID informado corresponde ao ID dentro do token
  if (String(payload.id_usuario) !== String(idInformado)) {
    return res.status(403).json({
      sucesso: false,
      mensagem: 'Acesso negado: o ID do usuário informado não corresponde ao token apresentado.',
    });
  }

  // Tudo certo: disponibiliza o usuário autenticado para os próximos handlers
  req.usuario = {
    id_usuario: payload.id_usuario,
    nome: payload.nome,
    nick: payload.nick,
  };

  next();
};

module.exports = authMiddleware;
