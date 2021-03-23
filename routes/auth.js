const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.post("/registo", authController.register);

router.post("/login", authController.login);

router.post("/painel", authController.painel);

router.get('/logout', authController.logout);

module.exports = router;