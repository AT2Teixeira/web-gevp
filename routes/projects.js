const express = require('express');
const pageMiddleware = require('../middlewares/page');
const projectController = require('../controllers/projects');

const router = express.Router();

router.get("/", pageMiddleware, projectController.visualizarTodos);

router.get("/:projectId", pageMiddleware, projectController.visualizarUm);

router.post("/", pageMiddleware, projectController.criar)

router.put("/:projectId", pageMiddleware, projectController.editar);

router.delete("/:projectId", pageMiddleware, projectController.eliminarUm);

module.exports = router;