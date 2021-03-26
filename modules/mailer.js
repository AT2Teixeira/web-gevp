const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

// Gmail web.gevp
const transport = nodemailer.createTransport({
  service: `${process.env.GMAIL_SERVICE}`,
  host: `${process.env.GMAIL_HOST}`,
  auth: {
    user: `${process.env.GMAIL_USER}`,
    pass: `${process.env.GMAIL_PASS}`
  }
});

// Mail (mailtrap.io)
/*
const transport = nodemailer.createTransport({
  host: `${process.env.MAILER_HOST}`,
  port: `${process.env.MAILER_PORT}`,
  auth: {
    user: `${process.env.MAILER_USER}`,
    pass: `${process.env.MAILER_PASS}`
  }
});
*/


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