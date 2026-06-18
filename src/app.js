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

// CONFIGURAÇÃO DO EJS

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MIDDLEWARES GLOBAIS

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loggerMiddleware);

// SESSÃO

app.use(
  session({
    secret: 'taskflow-segredo-123',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      httpOnly: true,
    },
  })
);

// ROTAS DE AUTENTICAÇÃO

app.use('/', authRoutes);

// ARQUIVOS ESTÁTICOS

app.use(express.static(path.join(__dirname, '../public')));

// ROTA PRINCIPAL


app.get('/', authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// ROTAS DE TAREFAS

app.use('/api/tarefas', authMiddleware, tarefaRoutes);

// ROTA 404

app.use((req, res) => {
  res.status(404).json({
    sucesso: false,
    mensagem: 'Rota não encontrada',
  });
});

// INICIALIZAÇÃO DO SERVIDOR

conectarBanco().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
});