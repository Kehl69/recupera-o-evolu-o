const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuarioModel');

const SEGREDO = process.env.JWT_SECRET || 'taskflow-segredo-123';
const EXPIRA_EM = '2h';

/**
 * Confere a senha informada com o hash salvo no banco.
 * Suporta dois formatos, para manter compatibilidade com a base "loja" já existente:
 *  - bcrypt (recomendado, hash começa com "$2")
 *  - md5 legado (hash de 32 caracteres hexadecimais)
 */
const senhaConfere = async (senhaDigitada, hashSalvo) => {
  if (!hashSalvo) return false;

  if (hashSalvo.startsWith('$2')) {
    return bcrypt.compare(senhaDigitada, hashSalvo);
  }

  if (/^[a-f0-9]{32}$/i.test(hashSalvo)) {
    const md5 = crypto.createHash('md5').update(senhaDigitada).digest('hex');
    return md5 === hashSalvo;
  }

  return senhaDigitada === hashSalvo;
};

// POST /api/login  { nick, senha }
const fazerLogin = async (req, res) => {
  const { nick, senha } = req.body;

  if (!nick || !senha) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Informe nick e senha.',
    });
  }

  try {
    const usuario = await usuarioModel.buscarPorNick(nick);

    if (!usuario) {
      return res.status(401).json({ sucesso: false, mensagem: 'Credenciais inválidas.' });
    }

    const ok = await senhaConfere(senha, usuario.senha);

    if (!ok) {
      return res.status(401).json({ sucesso: false, mensagem: 'Credenciais inválidas.' });
    }

    // Gera o token JWT com o ID do usuário embutido no payload
    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, nome: usuario.nome, nick: usuario.nick },
      SEGREDO,
      { expiresIn: EXPIRA_EM }
    );

    return res.status(200).json({
      sucesso: true,
      mensagem: 'Login realizado com sucesso.',
      token,
      id_usuario: usuario.id_usuario,
      nome: usuario.nome,
      nick: usuario.nick,
      // Lembrete de uso: envie esse mesmo id no cabeçalho "x-user-id" nas próximas requisições
    });
  } catch (erro) {
    console.error('Erro no login:', erro);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro interno no servidor.' });
  }
};

module.exports = { fazerLogin };
