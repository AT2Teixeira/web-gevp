const Product = require('../models/produto');
const Cart = require('../models/carrinho');

exports.getProductDetail = (req, res) => {
  const products = Product.findById(req.params.prodId);
  res.render('loja', { 
    prod: products[0], 
    name: 'Edward' 
  });
}

exports.addToCart = (req, res) => {
  const addedProduct = Product.findById(req.body.id)[0];
  Cart.save(addedProduct);
}

exports.getCart = (req, res) => {
  res.render('carrinho', { 
    cart: Cart.getCart(), 
    name: 'Edward' 
  });
}

exports.deleteInCart = (req, res) => {
  Cart.delete(req.body.prodId);
  res.redirect('/carrinho');
}