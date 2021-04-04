const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Project = require('../models/project');

module.exports = async (req, res, next) => {
  if(req.cookies.jwt) {
      try {
        // 1) Verifica o token
        const decoded = await (jwt.verify)(req.cookies.jwt,
        process.env.JWT_SECRET
        );
          
        // 2) Verificar se o utilizador ainda existe
        const user = await User.findById(decoded.id);
        
        if (!user) {
          return next();
        }
        
        // 3) Verifica os projetos
        const projects = await Project.find({user: user._id});
        
        if (projects < 1) {
          req.relatorio_null = true
        }
        
        let array = [];
        
        projects.map((val) => {
          array.push({id: val._id, title: val.title, description: val.description, createdAt: val.createdAt});
        });
        
        if (projects) {
          req.relatorio1 = array[0]
          req.relatorio2 = array[1]
          req.relatorio3 = array[2]
          req.relatorio4 = array[3]
          req.relatorio5 = array[4]
          req.relatorio6 = array[5]
        }

          req.user = user
        
          return next();
      } catch (error) {
        return next();
      }
    } else {
      next();
    }
}