const jwt = require('jsonwebtoken');
const Project = require('../models/project');
const User = require('../models/user');

exports.criar = async (req, res) => {  
  try {    
    const { title, description } = req.body;
    
    if (!title || !description) {
      return res.status(400).render('painel', {
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
      return res.status(400).render('painel', { 
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
    
    return res.redirect('/painel')

    
  } catch (err) {
    return res.status(400).render('painel', { 
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
    
    return res.redirect('/painel')
    
    
  } catch (err) {
    return res.status(400).render('painel', { 
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