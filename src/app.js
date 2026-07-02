require('dotenv').config();

const express = require('express');
const path = require('path');

const { conectarBanco } = require('./config/database');
const loggerMiddleware = require('./middlewares/logger');

const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const produtosRoutes = require('./routes/produtosRoutes');
const clientesRoutes = require('./routes/clientesRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');

// IMPORTAÇÃO DO SWAGGER
const { swaggerUi, swaggerSpec } = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES GLOBAIS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// LOGGER
app.use(loggerMiddleware);

// SWAGGER
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ARQUIVOS ESTÁTICOS
app.use(express.static(path.join(__dirname, '../public')));

// ROTAS PÚBLICAS
app.use(apiRoutes);
app.use(authRoutes);

// ROTAS PRIVADAS
app.use('/api/categorias', categoriaRoutes);
app.use('/api/produtos', produtosRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/pedidos', pedidosRoutes);

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
    console.log(`📚 Swagger disponível em http://localhost:${PORT}/api-docs`);
  });
});