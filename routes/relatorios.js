const express = require('express');
const pageMiddleware = require('../middlewares/page');
const authMiddleware = require('../middlewares/auth');
const relatorioController = require('../controllers/relatorios');

const router = express.Router();

router.get("/", authMiddleware, pageMiddleware, relatorioController.visualizar)

router.post("/add", authMiddleware, pageMiddleware, relatorioController.criar)

router.get("/del/:removeId", authMiddleware, pageMiddleware, relatorioController.eliminarUm)

router.get("/ver/:visualizarId", authMiddleware, pageMiddleware, relatorioController.visualizarUm)

module.exports = router;