const jwt = require('jsonwebtoken');
const promisify = require('util');

module.exports = async (req, res, next) => {
  if (req.cookies.jwt) {
      try {
        const decoded = await promisify(jwt.verify)(req.cookies.jwt,
        process.env.JWT_SECRET
        );
    } catch {
        return next()
      } 
    } else {
      return res.status(401).send({ error: 'Token inválido' })
    }
}