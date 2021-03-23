const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render('login', {
                message: 'Insira um email e uma password'
            })
        } 

        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            //console.log(results)
            let pass;
            try {
                pass = results[0].password
            } catch {
                return res.status(401).render('login', {
                    message: 'Email ou password incorretos.'
                }) 
            }
            if (!results || !(await bcrypt.compare(password, pass))) {
                res.status(401).render('login', {
                    message: 'Email ou password incorretos.'
                })
            } else {
                const id = results[0].id;

                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                //console.log(`O token é: ${token}`)

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/profile");
            }
        })

    } catch (err) {
        console.log(err);
    }
}

exports.register = (req, res) => {
    //console.log(req.body);

    const { name, surname, email, password, passwordConfirm } = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (!name || !surname || !email || !password || !passwordConfirm) {
            return res.status(400).render('register', {
                message: 'Preencha todos os dados.'
            })
        } 
        if (results.length > 0) {
            return res.render('register', {
                message: 'O email já está em uso.'
            })
        } else if (password !== passwordConfirm) {
            return res.render('register', {
                message: 'Palavra pass e confirmar palavra pass não coincidem.'
            }); 
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        //console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', {name: name, surname: surname, email: email, password: hashedPassword }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                //console.log(results);
                return res.render('register', {
                    message: 'Usuário registado!'
                }); 
            }
        })
    });
}

exports.painel = (req, res) => {
    //console.log(req.body);

    const { name, email, telefone, numero_funcionarios, setor } = req.body;

    db.query('SELECT email FROM empresas WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (!name || !email || !telefone || !numero_funcionarios || !setor) {
            return res.status(400).render('painel', {
                message: 'Preencha todos os dados.'
            })
        } 
        if (results.length > 0) {
            return res.render('painel', {
                message: 'O email já está em uso.'
            })
        }

        db.query('INSERT INTO empresas SET ?', {name: name, email: email, telefone: telefone, numero_funcionarios: numero_funcionarios, setor: setor }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                //console.log(results);
                return res.render('painel', {
                    message: 'Empresa atualizada com sucesso!'
                }); 
            }
        })
    });
}

exports.isLoggedIn = async (req, res, next) => {
    // console.log(req.cookies);
    if(req.cookies.jwt) {
      try {
        //1) Verifica o token
        const decoded = await promisify(jwt.verify)(req.cookies.jwt,
        process.env.JWT_SECRET
        );
  
        //console.log(decoded);
  
        //2) Verificar se o utilizador ainda existe
        db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {
          //console.log(result);
  
          if(!result) {
            return next();
          }
  
          req.user = result[0];
          //console.log("user is")
          //console.log(req.user);
          return next();
  
        });
      } catch (error) {
        //console.log(error);
        return next();
      }
    } else {
      next();
    }
  }
  
exports.logout = async (req, res) => {
res.cookie('jwt', 'logout', {
    expires: new Date(Date.now() + 2*1000),
    httpOnly: true
});

res.status(200).redirect('/');
}