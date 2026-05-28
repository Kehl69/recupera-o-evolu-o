require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');

const conectarBanco = require('./config/database');
const loggerMiddleware = require('./middlewares/logger');
const authMiddleware = require('./middlewares/auth');
const tarefaRoutes = require('./routes/tarefaRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para ler formulários HTML
app.use(loggerMiddleware);

// Configuração da sessão
app.use(session({
  secret: 'taskflow-segredo-123', // Chave usada para assinar o cookie
  resave: false,                   // Não salva sessão se não mudou nada
  saveUninitialized: false,        // Não cria sessão vazia
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,   // Sessão dura 2 horas
    httpOnly: true,                // JavaScript do browser não acessa o cookie
  }
}));

// Rotas de autenticação (não precisam estar logado)
app.use('/', authRoutes);

// Arquivos estáticos SÓ para quem está logado (CSS, JS do frontend)
// A pasta public/login.html é tratada pelo controller, então
// servimos os estáticos depois do middleware de auth só para o index
// Na verdade servimos estáticos normalmente, mas protegemos as rotas da API

// Serve arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, '../public')));

// Rota raiz — protegida, precisa estar logado
app.get('/', authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Rotas da API de tarefas — todas protegidas
app.use('/api/tarefas', authMiddleware, tarefaRoutes);

// Rota 404
app.use((req, res) => {
  res.status(404).json({ sucesso: false, mensagem: 'Rota não encontrada' });
});

// Conecta no banco e sobe o servidor
conectarBanco().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
});
