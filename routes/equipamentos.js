const express = require('express');
const pageMiddleware = require('../middlewares/page');
const authMiddleware = require('../middlewares/auth');
const EquipamentoController = require('../controllers/equipamentos');

const router = express.Router();

router.post("/add", authMiddleware, pageMiddleware, EquipamentoController.criar)

router.post("/editar/:ref", authMiddleware, pageMiddleware, EquipamentoController.editarUm)

router.get("/del/:ref", authMiddleware, pageMiddleware, EquipamentoController.eliminarUm)

module.exports = router;