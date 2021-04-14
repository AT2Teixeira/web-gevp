const express = require('express');
const pageMiddleware = require('../middlewares/page');
const authMiddleware = require('../middlewares/auth');
const projectController = require('../controllers/projects');

const router = express.Router();

router.get("/", pageMiddleware, authMiddleware, projectController.visualizarTodos);

router.get("/:projectId", pageMiddleware, authMiddleware, projectController.visualizarUm);

router.post("/", pageMiddleware, authMiddleware, projectController.criar)

router.put("/:projectId", pageMiddleware, authMiddleware, projectController.editar);

router.delete("/:projectId", pageMiddleware, authMiddleware, projectController.eliminarUm);

module.exports = router;