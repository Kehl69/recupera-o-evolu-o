const mongoose = require('mongoose');

const conectarBanco = async () => {
  try {

    const conn = await mongoose.connect(
      'mongodb://127.0.0.1:27017/taskflow'
    );

    console.log(
      `✅ MongoDB conectado: ${conn.connection.host}`
    );

  } catch (erro) {

    console.error(
      `❌ Erro ao conectar no banco: ${erro.message}`
    );

    process.exit(1);

  }
};

module.exports = conectarBanco;