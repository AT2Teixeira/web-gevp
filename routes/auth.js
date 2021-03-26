const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.post("/cadastro", authController.cadastro);

router.post("/login", authController.login);

router.post("/esqueceu_password", authController.esqueceu_password);

router.post("/resetar_password/:tokenId", authController.resetar_password);

module.exports = router;