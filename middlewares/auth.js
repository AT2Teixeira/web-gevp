const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  if(req.cookies.jwt) {
      try {
        // 1) Verifica o token
        const decoded = await (jwt.verify)(req.cookies.jwt,
        process.env.JWT_SECRET
        );
          
          return next();
      } catch (error) {
        return res.send({ error: 'Token erro' })
      }
    } else {
      res.send({ error: 'Token não encontrado' })
    }
}