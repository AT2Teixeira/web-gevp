const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.post("/cadastro", authController.cadastro);

router.post("/login", authController.login);

router.post("/esqueceu_password", authController.esqueceu_password);

router.get("/alterar_password/:tokenId/:email", authController.alterar_password);

router.post("/alterar_password_post", authController.alterar_password_post);

router.get("/logout", authController.logout);

module.exports = router;