const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get("/", (req, res) => {
    res.send({ ok: true });
});

router.get("/painel", authMiddleware, (req, res) => {
  res.render('/painel');
})

module.exports = router;