require('dotenv').config();
const mysql = require('mysql2/promise');

// Pool de conexões com o MySQL (driver mysql2, suporte a Promises/async-await)
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'loja',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
});

// Testa a conexão na inicialização do servidor
const conectarBanco = async () => {
  try {
    const conn = await pool.getConnection();
    console.log(`✅ MySQL conectado: banco "${process.env.DB_NAME || 'loja'}" em ${process.env.DB_HOST || 'localhost'}`);
    conn.release();
  } catch (erro) {
    console.error(`❌ Erro ao conectar no banco MySQL: ${erro.message}`);
    process.exit(1);
  }
};

module.exports = { pool, conectarBanco };
