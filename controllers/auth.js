const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const crypto = require('crypto');
const mailer = require('../modules/mailer')

function gerarToken(params = {}){
  return jwt.sign(params, process.env.JWT_SECRET, {
    expiresIn: 86400
  })
}

exports.cadastro = async (req, res) => {
  const { email } = req.body;
  
  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ error: "Usuário já cadastrado" })
      
    const user = await User.create(req.body);
    
    user.password = undefined;
    
    return res.send({ user, token: gerarToken({ id: user.id }) });
  } catch (err) {
    return res.status(400).send({ error: 'Erro no cadastro' })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email }).select('+password');
  
  if (!user){
    return res.status(400).send({ error: 'Usuário não encontrado' })
  }
  
  if (!await bcrypt.compare(password, user.password)) {
    return res.status(400).send({ error: 'Senha inválida' })
  }
  
  user.password = undefined;
  
  res.status(200).send({ user, token: gerarToken({ id: user.id }) });
}

exports.esqueceu_password = async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).send({ error: 'Usuário não encontrado' })
    }
    
    const token = crypto.randomBytes(20).toString('hex');
    
    const now = new Date();
    now.setHours(now.getHours() + 1);
    
    await User.findOneAndUpdate(user.id, {
      '$set': {
        passwordResetToken: token,
        passwordResetExpires: now
      }
    });
    
    mailer.sendMail({
      to: email,
      from: 'andre.s.teixeira21@hotmail.com',
      template: 'auth/esqueceu_password',
      context: { token }
    }, (err) => {
      if (err) {
        console.log(err);
        return res.status(400).send({ error: 'Não foi possível enviar o email de recuperação de senha' });
      }
      return res.send();
    });
    
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: 'Erro a tentar recuperar passoword, tente novamente' });
  }
}

exports.resetar_password = async (req, res) => {
  const { email, token, password } = req.body;
  
  try {
    const user = await User.findOne({ email }).select('+passwordResetExpires passwordResetToken');
    
    if (!user) {
      return res.status(400).send({ error: 'Usuário não encontrado' })
    }
    
    if (token !== user.passwordResetToken) {
      res.status(400).send({ error: 'Token inválido' });
    }
    
    const now = new Date()
    
    if (now > user.passwordResetExpires) {
      res.status(400).send({ error: 'Token expirado, por favor gere um novo' });
    }
    
    user.password = password;
    
    await user.save();
    
    res.send()
    
  } catch {
    res.status(400).send({ error: 'Erro a tentar alterar passoword, tente novamente' });
  }
}