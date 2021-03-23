const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

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

app.set('view engine', 'hbs');

//Definir as Rotas
app.use("/", require('./routes/pages'));
app.use("/auth", require('./routes/auth'));

//Definir erro ao não encontrar a página
app.get("*", (req, res) => {
    res.render("404");
})

const porta = 8080
app.listen(process.env.PORT || porta, () => {
    console.log(`Servidor rodando na porta: ${process.env.PORT || porta}`);
})