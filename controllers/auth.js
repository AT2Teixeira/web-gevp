const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const crypto = require('crypto');
const mailer = require('../modules/mailer')
const sessionstorage = require('sessionstorage');

function gerarToken(params = {}){
  return jwt.sign(params, process.env.JWT_SECRET, {
    expiresIn: 86400
  })
}

exports.cadastro = async (req, res) => {
   const { name, empresa, email, password, passwordConfirm } = req.body;
  
  try {
    if (!name || !empresa || !email || !password || !passwordConfirm) {
      return res.status(400).render('cadastro', {
          message: 'Preencha todos os campos'
      });
    } 
    
    if (await User.findOne({ email })) {
      return res.status(400).render('cadastro', { 
        message: 'Usuário já cadastrado' 
      });
    }
    
    if (password !== passwordConfirm) {
      return res.status(400).render('cadastro', {
          message: 'Palavra pass e confirmar palavra pass não coincidem'
      }); 
    }
      
    const user = await User.create(req.body);
    
    user.password = undefined;    
  
    
    res.cookie('jwt', await gerarToken({ id: user.id }));
    return res.redirect('/perfil')
    
  } catch (err) {
    return res.status(400).render('cadastro', { 
      message: 'Erro no cadastro' 
    });
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).render('login', {
      message: 'Preencha todos os campos'
    })
  } 
  
  const user = await User.findOne({ email }).select('+password');
  
  if (!user){
    return res.status(400).render('login', { 
      message: 'Senha ou email inválidos' 
    });
  }
  
  if (!await bcrypt.compare(password, user.password)) {
    return res.status(400).render('login', { 
      message: 'Senha ou email inválidos' 
    });
  }
  
  user.password = undefined;
  
  res.cookie('jwt', await gerarToken({ id: user.id }));
  res.status(200).redirect("/perfil");
}

exports.esqueceu_password = async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).render('esqueceu_password', {
      message: 'Preencha o campo'
    })
  } 
  
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).render('esqueceu_password', { 
        message: 'Email não encontrado' 
      });
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
      from: '"Noreply" <web.gevp@gmail.com>',
      subject: 'Recuperação de Senha',
      template: 'auth/esqueceu_password',
      context: { token, email }
    }, (err) => {
      if (err) {
        return res.status(400).render('esqueceu_password', { 
          message: 'Não foi possível enviar o email' 
        });
      }
      return res.status(200).render('esqueceu_password', { 
          message_sucesso: 'Email enviado com sucesso, por favor verifique a sua caixa' 
        });
    });
    
  } catch {
    return res.status(400).render('esqueceu_password', { 
      message: 'Erro a tentar recuperar passoword, tente novamente' 
    });
  }
}

exports.alterar_password = async (req, res) => {
  const token = req.params.tokenId;
  const email = req.params.email;
  
  try {
    const user = await User.findOne({ email }).select('+passwordResetExpires passwordResetToken');
    
    if (!user) {
      return res.status(400).render('esqueceu_password', { 
        message: 'Usuário não encontrado' 
      });
    }
    
    if (token !== user.passwordResetToken) {
      return res.status(400).render('esqueceu_password', { 
        message: 'Token inválido' 
      });
    }
    
    const now = new Date()
    
    if (now > user.passwordResetExpires) {
      return res.status(400).render('esqueceu_password', { 
        message: 'Token expirado, por favor gere um novo' 
      });
    }
    
    sessionstorage.setItem("token_email", { 
      token,
      email
    });
    
    return res.status(200).render('recuperar_password');
    
  } catch {
    return res.status(400).render('esqueceu_password', { 
      message: 'Erro a tentar alterar passoword, tente novamente' 
    });
  }
}

exports.alterar_password_post = async (req, res) => {
  const { password, passwordConfirm } = req.body;
  
  try {
    const { token, email } = sessionstorage.getItem("token_email")
    
    if (!token || !email) {
      return res.status(400).render('recuperar_password', { 
        message: 'Token ou email mal formatados' 
      });
    }
    
    const user = await User.findOne({ email }).select('+passwordResetExpires passwordResetToken');
    
    if (!user) {
      return res.status(400).render('recuperar_password', { 
        message: 'Usuário não encontrado' 
      });
    }
    
    if (token !== user.passwordResetToken) {
      return res.status(400).render('recuperar_password', { 
        message: 'Token inválido' 
      });
    }
    
    const now = new Date()
    
    if (now > user.passwordResetExpires) {
      return res.status(400).render('recuperar_password', { 
        message: 'Token expirado, por favor gere um novo' 
      });
    }
    
    if (password !== passwordConfirm) {
      return res.status(400).render('recuperar_password', {
          message: 'Palavra pass e confirmar palavra pass não coincidem'
      }); 
    }
    
    user.password = password;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    
    await user.save();
    
    return res.status(200).render('recuperar_password', {
      message_sucesso: 'Password alterada com sucesso, volte a realizar o login para entrar na sua conta'
    });
    
  } catch {
    return res.status(400).render('recuperar_password', { 
      message: 'Erro a tentar alterar passoword, tente novamente' 
    });
  }
}

exports.logout = async (req, res) => {
  try {
    res.cookie('jwt', 'logout', {
      expires: new Date(Date.now() + 1000),
      httpOnly: true
    });

    res.status(200).redirect('/');
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao realizar o logout, tente 23novamente' });
  }

}