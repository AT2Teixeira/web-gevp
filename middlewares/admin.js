const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  if(req.cookies.jwt) {
      try {
        // 1) Verifica o token
        const decoded = await (jwt.verify)(req.cookies.jwt,
        process.env.JWT_SECRET
        );
        const user = await User.findById(decoded.id);
          
        if (user._id == '605dcdc9e3a81403950ce595') {
          return next();
        } else {
          res.send({ error: 'Acesso negado' })
        }
        
      } catch (error) {
        return res.send({ error: 'Token erro' })
      }
    } else {
      res.send({ error: 'Token não encontrado' })
    }
}