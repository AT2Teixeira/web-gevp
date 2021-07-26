//Verifica se a pessoa está ou não logada em uma conta existente

const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Relatorio = require('../models/relatorios');
const Equipamentos = require('../models/equipamentos');
const moment =  require('moment');
moment.locale("pt-pt")

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

      // 3) Verifica os relatorios
      const relatorio = await Relatorio.find({user: user._id});

      if (relatorio < 1) {
        req.relatorio_null = true
      }

      let array = [];

      relatorio.map((val) => {
        array.push({id: val._id, title: val.title, description: val.description, conteudo: val.conteudo, createdAt: `Dia ${moment.parseZone(val.createdAt).utc(true).format("LL")} às ${moment.parseZone(val.createdAt).utc(true).format("LT")} | ${moment.parseZone(val.createdAt).utc(true).fromNow()}`});
      });

      if (relatorio) {
        req.relatorio1 = array[0]
        req.relatorio2 = array[1]
        req.relatorio3 = array[2]
        req.relatorio4 = array[3]
        req.relatorio5 = array[4]
        req.relatorio6 = array[5]
      }
      
      // 4) Verifica os equipamentos
      const equipamento = await Equipamentos.find({user: user._id});

      if (relatorio) {
        req.equipamentos = equipamento
      }

      let perms = new Object()
      if (user._id == process.env.ID) {
        perms.admin = true
      } else {
        perms.membro = true
      }

      req.user = user
      req.permissoes = perms

      return next();

    } catch (error) {
      return next();
    }
  } else {
    return next();
  }
}