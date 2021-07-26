const mongoose = require('../database');

const EquipamentosSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  referencia: {
    type: String,
    required: true
  },
  data: {
    type: String,
    require: true
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

const Equipamentos = mongoose.model('Equipamentos', EquipamentosSchema);

module.exports = Equipamentos;