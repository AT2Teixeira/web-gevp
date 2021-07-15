const Product = require('../models/produto');

exports.postProduct = (req, res) => {
  const { title, price, imageUrl, description } = req.body

  const prod = new Product(null, title, price, imageUrl, description);
  prod.save();

  res.redirect('/loja');
}

exports.editProductPage = (req, res) => {
  const products = Product.findById(req.params.prodId);
  res.render('editar-produto', { 
    product: products[0]
  });
}

exports.editProductPost = (req, res) => {
  const updatedProduct = new Product(req.body.id, req.body.title, req.body.price, req.body.imageURL, req.body.description);
  updatedProduct.update();
  res.redirect(`/loja/${updatedProduct.id}`);
}

exports.deleteProduct = (req, res) => {
  Product.deleteById(req.body.id);
  res.redirect('/loja');
}