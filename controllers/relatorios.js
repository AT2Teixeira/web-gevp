const jwt = require('jsonwebtoken');
const Project = require('../models/project');
const User = require('../models/user');

exports.visualizar = async (req, res) => {
  if(req.user) {
    res.render('relatorios', {
      user: req.user,
      relatorio1: req.relatorio1,
      relatorio2: req.relatorio2,
      relatorio3: req.relatorio3,
      relatorio4: req.relatorio4,
      relatorio5: req.relatorio5,
      relatorio6: req.relatorio6,
      relatorio_null: req.relatorio_null
    });
  } else {
    res.redirect('/login');
  }
}

exports.criar = async (req, res) => {  
  try {    
    const { title, description } = req.body;
    
    if (!title || !description) {
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
    const projects = await Project.find({user: user.id});
    
    if (projects[5]) {
      return res.status(400).render('relatorios', { 
        message: 'Limite máximo de relatórios (máx: 6)', 
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
    
    
    const project = await Project.create({ title, description, user: req.user });
    
    await project.save()
    
    return res.redirect('/relatorios')

    
  } catch (err) {
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
    const project = await Project.findByIdAndRemove(req.params.removeId);
    
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
    const project = await Project.findById(req.params.visualizarId);
    
    return res.render('painel', {
      relatorio_visualizar: project,
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