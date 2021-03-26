const express = require('express');
const pageMiddleware = require('../middlewares/page');
const relatorioController = require('../controllers/relatorios');

const router = express.Router();

router.post("/add", pageMiddleware, relatorioController.criar)

router.get("/del/:removeId", pageMiddleware, relatorioController.eliminarUm)

module.exports = router;