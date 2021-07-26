const Product = require('../models/produto');
const Cart = require('../models/carrinho');

exports.index = async (req, res) => {
  //console.log(req.user)
  res.render("index", {
    user: req.user
  });
}

exports.relatorios = async (req, res) => {
  if(req.user) {
    res.render('relatorios', {
      user: req.user,
      relatorio1: req.relatorio1,
      relatorio2: req.relatorio2,
      relatorio3: req.relatorio3,
      relatorio4: req.relatorio4,
      relatorio5: req.relatorio5,
      relatorio6: req.relatorio6,
      relatorio_null: req.relatorio_null
    });
  } else {
    res.redirect('/login');
  }
}

exports.cadastro = async (req, res) => {
  if(!req.user) {
    res.render('cadastro', {
      user: req.user
    });
  } else {
    res.redirect('/perfil');
  }
}

exports.esqueceu_password = async (req, res) => {
  if(!req.user) {
    res.render('esqueceu_password')
  } else {
    res.redirect('/');
  }
}

exports.login = async (req, res) => {
  if(!req.user) {
    res.render('login', {
      user: req.user
    });
  } else {
    res.redirect('/perfil');
  }
}

exports.painel = async (req, res) => {
  if(req.user) {
    res.render('painel', {
      user: req.user,
      relatorio1: req.relatorio1,
      relatorio2: req.relatorio2,
      relatorio3: req.relatorio3,
      relatorio4: req.relatorio4,
      relatorio5: req.relatorio5,
      relatorio6: req.relatorio6,
      relatorio_null: req.relatorio_null
    });
  } else {
    res.redirect('/login');
  }
}

exports.perfil = async (req, res) => {
  if(req.user) {
      res.render('perfil', {
        user: req.user,
        perms: req.permissoes
      });
    } else {
      res.redirect('/login');
    }
}

exports.loja = async (req, res) => {
  if(req.user) {
    const products = Product.findAll();
    res.render('loja', {
      user: req.user,
      prods: products,
      perms: req.permissoes,
      relatorio1: req.relatorio1,
      relatorio2: req.relatorio2,
      relatorio3: req.relatorio3,
      relatorio4: req.relatorio4,
      relatorio5: req.relatorio5,
      relatorio6: req.relatorio6,
      relatorio_null: req.relatorio_null
    });
  } else {
    res.redirect('/login');
  }
}

exports.produtos = (req, res) => {
  if(req.user) {
    const products = Product.findById(req.params.prodId);
    res.render('produtos', {
      user: req.user,
      prod: products[0],
      perms: req.permissoes,
      relatorio1: req.relatorio1,
      relatorio2: req.relatorio2,
      relatorio3: req.relatorio3,
      relatorio4: req.relatorio4,
      relatorio5: req.relatorio5,
      relatorio6: req.relatorio6,
      relatorio_null: req.relatorio_null
    });
  } else {
    res.redirect('/login');
  }
}

exports.carrinho = (req, res) => {
  if(req.user) {
    res.render('carrinho', {
      user: req.user,
      cart: Cart.getCart(),
      perms: req.permissoes,
      relatorio1: req.relatorio1,
      relatorio2: req.relatorio2,
      relatorio3: req.relatorio3,
      relatorio4: req.relatorio4,
      relatorio5: req.relatorio5,
      relatorio6: req.relatorio6,
      relatorio_null: req.relatorio_null
    });
  } else {
    res.redirect('/login');
  }
}

exports.equipamentos = (req, res) => {
  if(req.user) {
    res.render('equipamentos', {
      user: req.user,
      equipamentos: req.equipamentos,
      relatorio1: req.relatorio1,
      relatorio2: req.relatorio2,
      relatorio3: req.relatorio3,
      relatorio4: req.relatorio4,
      relatorio5: req.relatorio5,
      relatorio6: req.relatorio6,
      relatorio_null: req.relatorio_null
    });
  } else {
    res.redirect('/login');
  }
}

exports.definicoes = async (req, res) => {
  if(req.user) {
      res.render('definicoes', {
        user: req.user,
        perms: req.permissoes
      });
    } else {
      res.redirect('/login');
    }
}