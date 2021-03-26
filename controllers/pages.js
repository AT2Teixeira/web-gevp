exports.index = async (req, res) => {
  //console.log(req.user)
  res.render("index", {
    user: req.user
  });
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

exports.carrinho = async (req, res) => {
  res.render('carrinho');
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

exports.loja = async (req, res) => {
  res.render('loja');
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
        user: req.user
      });
    } else {
      res.redirect('/login');
    }
}