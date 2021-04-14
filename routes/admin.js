const express = require('express');
const adminMiddleware = require('../middlewares/admin');
const adminController = require('../controllers/admin');

const router = express.Router();

router.post("/adicionar-produto", adminMiddleware, adminController.postProduct);

router.get('/editar-produto/:prodId', adminMiddleware, adminController.editProductPage);

router.post('/editar-produto', adminMiddleware, adminController.editProductPost);

router.post('/eliminar-produto', adminMiddleware, adminController.deleteProduct);

module.exports = router;