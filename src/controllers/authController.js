const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuarioModel');

const SEGREDO = process.env.JWT_SECRET || 'taskflow-segredo-123';
const EXPIRA_EM = '2h';

/**
 * Confere a senha informada com o hash salvo no banco.
 * Suporta dois formatos:
 * - bcrypt (hash começa com "$2")
 * - md5 legado (32 caracteres)
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

// POST /api/login { email, senha }
const fazerLogin = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Informe email e senha.',
    });
  }

  try {
    const usuario = await usuarioModel.buscarPorEmail(email);

    if (!usuario) {
      return res.status(401).json({
        sucesso: false,
        mensagem: 'Credenciais inválidas.',
      });
    }

    const ok = await senhaConfere(senha, usuario.senha);

    if (!ok) {
      return res.status(401).json({
        sucesso: false,
        mensagem: 'Credenciais inválidas.',
      });
    }

    // Gera o token JWT
    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
      },
      SEGREDO,
      { expiresIn: EXPIRA_EM }
    );

    return res.status(200).json({
      sucesso: true,
      mensagem: 'Login realizado com sucesso.',
      token,
      id_usuario: usuario.id_usuario,
      nome: usuario.nome,
      email: usuario.email,
    });

  } catch (erro) {
    console.error('Erro no login:', erro);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor.',
    });
  }
};

module.exports = { fazerLogin };