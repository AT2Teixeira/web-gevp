const jwt = require('jsonwebtoken');
const Equipamentos = require('../models/equipamentos');
const User = require('../models/user');
const moment =  require('moment');
moment.locale("pt-pt")

exports.criar = async (req, res) => {  
  try {    
    const { name, referencia, data } = req.body;
    
    if (!name || !referencia || !data) {
      return res.status(400).render('equipamentos', {
        message: 'Preencha todos os campos',
        user: req.user,
        equipamentos: req.equipamentos,
        relatorio1: req.relatorio1,
        relatorio2: req.relatorio2,
        relatorio3: req.relatorio3,
        relatorio4: req.relatorio4,
        relatorio5: req.relatorio5,
        relatorio6: req.relatorio6,
        relatorio_null: req.relatorio_null
      })
    }
    
    let user = req.user
    
    const equipamento_save = await Equipamentos.create({ name, referencia, data: `Dia ${moment.parseZone(data).utc(true).format("LL")} | ${moment.parseZone(data).utc(true).fromNow()}`, user: req.user });
    
    await equipamento_save.save()
    
    return res.redirect('/equipamentos');

    
  } catch {
    return res.status(400).render('equipamentos', { 
      message: 'Erro ao tentar criar o relatório, tente novamente', 
      user: req.user,
      equipamentos: req.equipamentos,
      relatorio1: req.relatorio1,
      relatorio2: req.relatorio2,
      relatorio3: req.relatorio3,
      relatorio4: req.relatorio4,
      relatorio5: req.relatorio5,
      relatorio6: req.relatorio6,
      relatorio_null: req.relatorio_null
    });
  }
}

exports.editarUm = async (req, res) => {
  const { name, referencia, data } = req.body;
  
  try {
    const equipamento = await Equipamentos.findOneAndUpdate({referencia: req.params.ref});
    
    equipamento.name = name
    equipamento.referencia = referencia
    equipamento.data = `Dia ${moment.parseZone(data).utc(true).format("LL")} | ${moment.parseZone(data).utc(true).fromNow()}`
    
    await equipamento.save()
    
    return res.redirect('/equipamentos'); 
    
  } catch {
    return res.status(400).render('equipamentos', { 
      message: 'Erro ao tentar visualizar o relatório',
      user: req.user,
      equipamentos: req.equipamentos,
      relatorio1: req.relatorio1,
      relatorio2: req.relatorio2,
      relatorio3: req.relatorio3,
      relatorio4: req.relatorio4,
      relatorio5: req.relatorio5,
      relatorio6: req.relatorio6,
      relatorio_null: req.relatorio_null
    });
  }
}

exports.eliminarUm = async (req, res) => {
  try {
    const relatorio = await Equipamentos.findOneAndRemove(req.params.ref);
    
    return res.redirect('/equipamentos');
    
    
  } catch {
    return res.status(400).render('equipamentos', { 
      message: 'Erro ao eliminar o equipamento, tente novamente' ,
      user: req.user,
      equipamentos: req.equipamentos,
      relatorio1: req.relatorio1,
      relatorio2: req.relatorio2,
      relatorio3: req.relatorio3,
      relatorio4: req.relatorio4,
      relatorio5: req.relatorio5,
      relatorio6: req.relatorio6,
      relatorio_null: req.relatorio_null
    });
  }
}