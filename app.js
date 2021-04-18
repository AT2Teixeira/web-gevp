const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');

const app = express();

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

const JSDirectory = path.join(__dirname, './js');
app.use(express.static(JSDirectory));

//Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
//Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
hbs.registerPartials(path.join(__dirname + '/views/templates'))

//Definir as Rotas
if (process.env.MANU_ON) {
  app.use("/", (req, res) => {
    res.status(423).send({ erro: 'Página em desenvolvimento' })
  })
} else {
  app.use("/", require('./routes/pages'));
  app.use("/admin", require('./routes/admin'))
  app.use("/auth", require('./routes/auth'));
  app.use("/loja", require('./routes/loja'));
  app.use("/relatorios", require('./routes/relatorios'));
  app.use("/projects", require('./routes/projects'));
}

//Definir erro ao não encontrar a página
app.get("*", (req, res) => {
    res.status(404).render("404");
})

const porta = 8080
app.listen(process.env.PORT || porta, () => {
    console.log(`Servidor rodando na porta: ${process.env.PORT || porta}`);
})