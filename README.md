# Projeto de Aptidão Profissional

Este foi o meu projeto de aptidão profissional final de curso.

Comecei com o Desenvolvimento em 2019 (ainda que o primeiro commit para o GitHub foi em 2021, pois foi nesse mesmo ano que criei a miha conta) com o início do meu curso, e apresentei o projeto em Julho de 2021.

**Tornei o projeto público com o intuito de ajudar, inspirar e partilhar com mais pessoas o meu primeiro projeto web!**

Convém reforçar que hoje em dia eu adoto outras ferramentas e outra organização de código. 
Quando olho para o que fiz à uns anos consigo ter total percessão do que evolui nesse aspeto e o que faria melhor agora!
Olho para este projeto com um carinho especial por ser um projeto especial!


## 🚀 | Começo

O primeiro passo foi definir a finalidade do web site. A minha ideia foi produzir uma dashboard para ajudar empresas na gestão da manutenção dos seus equipamentos e associado a isso criei também um eCommerce em que as mesmas lojas podiam comprar produtos!

Em 2019, comecei inicialmente o projeto com PHP e como base de dados usava MySQL.

Em 2020, comecei a aprender JavaScrip, e rapidamente entrei no mundo NodeJS.

Foi neste mesmo ano que decidi tomar uma decisão arriscada, mas que acabou por dar certo, parei de desenvolver em Php e comecei novamente todo o meu site com as novas tecnologias que vim a aprender.


## 🛠️ | Tecnologias e ferramentas que usei:

- Hospedei o web site na Glitch.com (descontinuada), e como base de dados usei MongoDB.

- Como linguagem principal usei JavaScript em ambiente NodeJS.

- Sempre gostei mais da parte do back-end (servidor), então os meus conhecimentos não são os melhores no front-end, é aqui que entra o Bootstrap um framework estilização de componentes HTML e CSS.

Usei também algumas bibliotecas dentro delas:

- express (Toda a contrução do servidor web foi com ele, desde definir, rotas, controllers ou middlewares)
- bcryptjs (Usei esta biblioteca para encriptar as senhas. Ou seja nunca guardava a senha "crua" na base de dados, era sempre o hash e depois comparava se batia certo o hash da base de dados com o que a pessoa estava a tentar entrar)
- hbs (Usava para pré-definir alguns carregamentos iniciais para as páginas como footer, estilizações e scripts. E o essencial para colocar na página alguns dados que passava no request)
- jsonwebtoken (Usava para guardar um token de autenticação para o utilizador não precisar estar a fazer sempre o login)
- mongoose (Para todas as operações com a base de dados)
- nodemailer (Para enviar os emails de recuperação de password etc)
- crypto-js (Usava para criar um token que continha os dados, que era enviado para confirmação do email)

## 🔎 | Observações:

Mesmo sendo um projeto pequeno e único, mantive sempre o aspeto da segurança!

Tendo middlewares que controlavam toda a autenticação de usuários e das respetivas páginas.
