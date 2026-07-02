const express = require('express');
const router = express.Router();

// GET /api/status e GET /api/versao -> rota pública de monitoramento (sem autenticação)
const status = (req, res) => {
  res.status(200).json({
    versao: '2.0.0',
    status: 'online',
    banco: 'MySQL',
    timestamp: new Date().toISOString(),
  });
};

router.get('/api/status', status);
router.get('/api/versao', status);

module.exports = router;
