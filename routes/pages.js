const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.get("/", authController.isLoggedIn, (req, res) => {
    res.render("index", {
      user: req.user
    });
});

router.get("/loja", (req, res) => {
  res.render('loja')
});

router.get("/carrinho", (req, res) => {
  res.render('carrinho')
});

router.get("/registo", authController.isLoggedIn, (req, res) => {
  if(!req.user) {
    res.render('registo', {
      user: req.user
    });
  } else {
    res.redirect('/perfil');
  }
});

router.get("/login", authController.isLoggedIn, (req, res) => {
  if(!req.user) {
    res.render('login', {
      user: req.user
    });
  } else {
    res.redirect('/perfil');
  }
});

router.get("/painel", authController.isLoggedIn, (req, res) => {
  //console.log(req.user);
  res.render('painel');
  /*
  if(req.user) {
    res.render('painel', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }
  */
});

router.get('/perfil', authController.isLoggedIn, (req, res) => {
    //console.log(req.user);
    if(req.user) {
      res.render('perfil', {
        user: req.user
      });
    } else {
      res.redirect('/login');
    }
});

module.exports = router;