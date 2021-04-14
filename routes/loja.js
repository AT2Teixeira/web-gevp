const express = require('express');
const authMiddleware = require('../middlewares/auth');
const lojaController = require('../controllers/loja');

const router = express.Router();

router.get('/produtos/:prodId', authMiddleware, lojaController.getProductDetail);

router.post('/adicionar-ao-carrinho', authMiddleware, lojaController.addToCart);

router.get('/carrinho', authMiddleware, lojaController.getCart);

router.post('/eliminar-do-carrinho', authMiddleware, lojaController.deleteInCart);

module.exports = router;