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
        return res.send({ error: 'Token error' })
      }
    } else {
      res.send({ error: 'Token not found' })
    }
}