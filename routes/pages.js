const express = require('express');
const pageMiddleware = require('../middlewares/page');
const pageController = require('../controllers/pages');

const router = express.Router();

router.get("/", pageMiddleware, pageController.index);

router.get("/cadastro", pageMiddleware, pageController.cadastro);

router.get("/esqueceu_password", pageMiddleware, pageController.esqueceu_password);

router.get("/carrinho", pageMiddleware, pageController.carrinho);

router.get("/login", pageMiddleware, pageController.login);

router.get("/loja", pageMiddleware, pageController.loja);

router.get("/painel", pageMiddleware, pageController.painel);

router.get("/perfil", pageMiddleware, pageController.perfil);

module.exports = router;