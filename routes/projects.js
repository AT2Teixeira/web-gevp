const express = require('express');
const authMiddleware = require('../middlewares/auth');
const projectController = require('../controllers/projects');

const router = express.Router();

router.get("/", authMiddleware, projectController.visualizarTodos);

router.get("/:projectId", authMiddleware, projectController.visualizarUm);

router.post("/", authMiddleware, projectController.criar)

router.put("/:projectId", authMiddleware, projectController.editar);

router.delete("/:projectId", authMiddleware, projectController.eliminarUm);

module.exports = router;