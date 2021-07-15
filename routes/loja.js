const express = require('express');
const authMiddleware = require('../middlewares/auth');
const lojaController = require('../controllers/loja');

const router = express.Router();

router.post('/adicionar-ao-carrinho', authMiddleware, lojaController.addToCart);

router.post('/eliminar-do-carrinho', authMiddleware, lojaController.deleteInCart);

module.exports = router;