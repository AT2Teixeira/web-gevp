//Verifica se a pessoa que está a tentar aceder ao endpoint está logada em uma conta existente

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
        return res.status(401).send({ error: 'Acesso negado' })
      }
    } else {
      res.status(400).send({ error: 'Token não encontrado' })
    }
}