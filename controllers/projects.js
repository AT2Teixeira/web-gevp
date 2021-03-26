const Project = require('../models/project');
const Task = require('../models/task');

exports.visualizarTodos = async (req, res) => {
  try {
    const projects = await Project.find().populate(['user', 'tasks']);
    
    return res.send({ projects })
    
    
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao tentar visualizar todos os projetos' });
  }
}

exports.visualizarUm = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).populate(['user', 'tasks']);
    
    return res.send({ project })
    
    
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao tentar visualizar o projeto' });
  }
}

exports.criar = async (req, res) => {
  try {
    const { title, description, tasks } = req.body;
    
    const project = await Project.create({ title, description, user: req.userId });
    
    await Promise.all(tasks.map(async task => {
      const projectTask = new Task({ ...task, project: project._id });
      
      await projectTask.save();
      
      project.tasks.push(projectTask);
    }));
    
    await project.save()
    
    return res.send({ project });
    
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao tentar criar o projeto' });
  }
}

exports.editar = async (req, res) => {
  try {
    const { title, description, tasks } = req.body;
    
    const project = await Project.findByIdAndUpdate(req.params.projectId, { 
      title, 
      description,
    }, { new: true });
    
    project.tasks = [];
    
    await Task.remove({ project: project._id });
    
    await Promise.all(tasks.map(async task => {
      const projectTask = new Task({ ...task, project: project._id });
      
      await projectTask.save();
      
      project.tasks.push(projectTask);
    }));
    
    await project.save()
    
    return res.send({ project });
    
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao tentar editar o projeto' });
  }
}

exports.eliminarUm = async (req, res) => {
  try {
    const project = await Project.findByIdAndRemove(req.params.projectId);
    
    await Task.remove({ project: project._id });
    
    return res.send()
    
    
  } catch (err) {
    return res.status(400).send({ error: 'Erro ao eliminar o projeto' });
  }
}