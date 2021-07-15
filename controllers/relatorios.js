const jwt = require('jsonwebtoken');
const Relatorios = require('../models/relatorios');
const User = require('../models/user');

exports.criar = async (req, res) => {  
  try {    
    const { title, description, conteudo } = req.body;
    
    if (!title || !description || !conteudo) {
      return res.status(400).render('relatorios', {
        message: 'Preencha todos os campos',
        user: req.user,
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
    const relatorio = await Relatorios.find({user: user.id});
    
    if (relatorio[5]) {
      return res.status(400).render('relatorios', { 
        message: 'Limite máximo de relatórios (Máx: 6)', 
        user: req.user,
        relatorio1: req.relatorio1,
        relatorio2: req.relatorio2,
        relatorio3: req.relatorio3,
        relatorio4: req.relatorio4,
        relatorio5: req.relatorio5,
        relatorio6: req.relatorio6,
        relatorio_null: req.relatorio_null
      });
    }
    
    const relatorio_save = await Relatorios.create({ title, description, conteudo: Array(conteudo), user: req.user });
    
    await relatorio_save.save()
    
    return res.redirect('/relatorios')

    
  } catch (err) {
    console.log(err)
    return res.status(400).render('relatorios', { 
      message: 'Erro ao tentar criar o relatório, tente novamente', 
      user: req.user,
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
    const relatorio = await Relatorios.findByIdAndRemove(req.params.removeId);
    
    return res.redirect('/relatorios')
    
    
  } catch (err) {
    return res.status(400).render('relatorios', { 
      message: 'Erro ao eliminar o relatório, tente novamente' ,
      user: req.user,
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

exports.visualizarUm = async (req, res) => {
  try {
    const relatorio = await Relatorios.findById(req.params.visualizarId);
    
    return res.render('painel', {
      relatorio_visualizar: relatorio,
      user: req.user,
      relatorio1: req.relatorio1,
      relatorio2: req.relatorio2,
      relatorio3: req.relatorio3,
      relatorio4: req.relatorio4,
      relatorio5: req.relatorio5,
      relatorio6: req.relatorio6,
      relatorio_null: req.relatorio_null
    });    
    
  } catch (err) {
    return res.status(400).render('painel', { 
      message: 'Erro ao tentar visualizar o relatório',
      user: req.user,
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