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
          
        if (user._id == process.env.ID) {
          return next();
        } else {
          return res.status(401).send({ error: 'Acesso negado' })
        }
        
      } catch (error) {
        return res.status(401).send({ error: 'Acesso negado' })
      }
    } else {
      return res.status(400).send({ error: 'Token não encontrado' })
    }
}