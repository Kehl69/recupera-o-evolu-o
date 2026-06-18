
const mongoose = require('mongoose');

/**
 * Schema responsável por definir a estrutura dos documentos
 * da coleção de tarefas no MongoDB.
 */
const tarefaSchema = new mongoose.Schema({
  titulo:{
    type:String,
    required:[true,'O título é obrigatório'],
    trim:true,
    maxlength:[100,'Título não pode ter mais de 100 caracteres']
  },
  descricao:{
    type:String,
    trim:true,
    default:''
  },
  status:{
    type:String,
    enum:['pendente','em_andamento','concluida'],
    default:'pendente'
  },
  prioridade:{
    type:String,
    enum:['baixa','media','alta'],
    default:'media'
  }
},{timestamps:true});

/**
 * Model Tarefa.
 * Utilizado para realizar operações CRUD na coleção tarefas.
 * @class Tarefa
 * @returns {mongoose.Model}
 * @throws {Error} Retorna erro caso os dados não atendam ao schema.
 */
const Tarefa = mongoose.model('Tarefa', tarefaSchema);

module.exports = Tarefa;
