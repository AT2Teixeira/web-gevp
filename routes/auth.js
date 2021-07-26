const express = require('express');
const pageMiddleware = require('../middlewares/page');
const authController = require('../controllers/auth');

const router = express.Router();

router.post("/cadastro", pageMiddleware, authController.cadastro);

router.get("/verificar_identidade/:id", pageMiddleware, authController.verificar_identidade);

router.post("/login", pageMiddleware, authController.login);

router.post("/esqueceu_password", pageMiddleware, authController.esqueceu_password);

router.get("/alterar_password/:tokenId/:email", pageMiddleware, authController.alterar_password);

router.post("/alterar_password_post", pageMiddleware, authController.alterar_password_post);

router.post("/perfil/definicoes", pageMiddleware, authController.definicoes);

router.post("/perfil/definicoes/verificar_numero", pageMiddleware, authController.verificar_numero);

router.get("/logout", pageMiddleware, authController.logout);

module.exports = router;