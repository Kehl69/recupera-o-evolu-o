const mongoose = require('mongoose');

// Schema define a estrutura dos documentos no MongoDB
const tarefaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, 'O título é obrigatório'],
      trim: true,
      maxlength: [100, 'Título não pode ter mais de 100 caracteres'],
    },
    descricao: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['pendente', 'em_andamento', 'concluida'],
      default: 'pendente',
    },
    prioridade: {
      type: String,
      enum: ['baixa', 'media', 'alta'],
      default: 'media',
    },
  },
  {
    // timestamps adiciona automaticamente createdAt e updatedAt
    timestamps: true,
  }
);

// O model é a interface que usamos para falar com a coleção "tarefas"
const Tarefa = mongoose.model('Tarefa', tarefaSchema);

module.exports = Tarefa;
