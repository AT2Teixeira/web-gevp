const Product = require('../models/produto');
const Cart = require('../models/carrinho');

exports.addToCart = (req, res) => {
  const addedProduct = Product.findById(req.body.id)[0];
  Cart.save(addedProduct);
}

exports.deleteInCart = (req, res) => {
  Cart.delete(req.body.prodId);
  res.redirect('/carrinho');
}