const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

// Gmail web.gevp
/*
const transport = nodemailer.createTransport({
  service: `${process.env.GMAIL_SERVICE}`,
  host: `${process.env.GMAIL_HOST}`,
  auth: {
    user: `${process.env.GMAIL_USER}`,
    pass: `${process.env.GMAIL_PASS}`
  }
});
*/

// Mail (mailtrap.io)

const transport = nodemailer.createTransport({
  host: `${process.env.GMAIL_HOST}`,
  port: `${process.env.GMAIL_PORT}`,
  secure: true, // Usando SSL
  auth: {
    user: `${process.env.GMAIL_USER}`,
    pass: `${process.env.GMAIL_PASS}`
  }
});



transport.use('compile', hbs({
  viewEngine: {
        extName: ".html",
        partialsDir: path.resolve('./mail'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./mail'),
    extName: ".html",
}));

module.exports = transport;