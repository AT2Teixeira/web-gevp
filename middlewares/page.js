const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  if(req.cookies.jwt) {
      try {
        //1) Verifica o token
        const decoded = await (jwt.verify)(req.cookies.jwt,
        process.env.JWT_SECRET
        );
  
        //2) Verificar se o utilizador ainda existe
        const user = await User.findById(decoded.id);
        
        if (!user) {
          return next();
        }
  
        //console.log("passou", user)
          req.user = user
          //console.log("user is")
          //console.log(req.user);
          return next();
      } catch (error) {
        console.log(error);
        return next();
      }
    } else {
      next();
    }
}