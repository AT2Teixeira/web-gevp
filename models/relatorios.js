const mongoose = require('../database');

const RelatorioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  conteudo: {
    type: Array,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Relatorio = mongoose.model('Relatorio', RelatorioSchema);

module.exports = Relatorio;