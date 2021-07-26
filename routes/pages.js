const express = require('express');
const pageMiddleware = require('../middlewares/page');
const pageController = require('../controllers/pages');

const router = express.Router();

router.get("/", pageMiddleware, pageController.index);

router.get("/cadastro", pageMiddleware, pageController.cadastro);

router.get("/esqueceu_password", pageMiddleware, pageController.esqueceu_password);

router.get("/perfil/definicoes", pageMiddleware, pageController.definicoes);

router.get("/relatorios", pageMiddleware, pageController.relatorios)

router.get("/carrinho", pageMiddleware, pageController.carrinho)

router.get("/produtos/:prodId", pageMiddleware, pageController.produtos)

router.get("/login", pageMiddleware, pageController.login);

router.get("/loja", pageMiddleware, pageController.loja);

router.get("/painel", pageMiddleware, pageController.painel);

router.get("/equipamentos", pageMiddleware, pageController.equipamentos);

router.get("/perfil", pageMiddleware, pageController.perfil);

module.exports = router;