const mongoose = require('mongoose');

// Função que conecta no MongoDB usando a URI do .env
const conectarBanco = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
  } catch (erro) {
    console.error(`❌ Erro ao conectar no banco: ${erro.message}`);
    process.exit(1); // Para tudo se não conseguir conectar
  }
};

module.exports = conectarBanco;
