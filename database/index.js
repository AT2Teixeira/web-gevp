const mongoose = require('mongoose');

const url = `mongodb+srv://AT2:${process.env.ACESSO_DATABASE}@cluster0.i71ir.mongodb.net/PAP?retryWrites=true&w=majority`

mongoose.connect(url, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Banco de dados conectado com sucesso!')
})

mongoose.Promise = global.Promise;

module.exports = mongoose;