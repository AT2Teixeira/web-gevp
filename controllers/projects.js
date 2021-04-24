const Relatorio = require('../models/relatorios');

exports.visualizarTodos = async (req, res) => {
  try {
    const projects = await Relatorio.find().populate(['user']);
    
    return res.send({ projects })
    
    
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao tentar visualizar todos os projetos' });
  }
}

exports.visualizarUm = async (req, res) => {
  try {
    const project = await Relatorio.findById(req.params.projectId).populate(['user']);
    
    return res.send({ project })
    
    
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao tentar visualizar o projeto' });
  }
}

exports.criar = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    const project = await Relatorio.create({ title, description, user: req.userId });
    
    await project.save()
    
    return res.send({ project });
    
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao tentar criar o projeto' });
  }
}

exports.editar = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    const project = await Relatorio.findByIdAndUpdate(req.params.projectId, { 
      title, 
      description,
    }, { new: true });
    
    await project.save()
    
    return res.send({ project });
    
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao tentar editar o projeto' });
  }
}

exports.eliminarUm = async (req, res) => {
  try {
    const project = await Relatorio.findByIdAndRemove(req.params.projectId);
    
    return res.send()
    
    
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao eliminar o projeto' });
  }
}