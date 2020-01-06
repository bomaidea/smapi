const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const transporter = nodemailer.createTransport({

  host: 'smtp.server.com',
  provider: 'server_provider',
  port: 465,
  secure: true,
  auth: {
    user: '', // Enter here email address from which you want to send emails
    pass: '' // Enter here password for email account from which you want to send emails
  },
  tls: {
  rejectUnauthorized: false
  }
});

app.use(bodyParser.json());

app.use(function (req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/send', function (req, res) {

  let from = req.body.from;
  let subject = req.body.subject;
  let message = req.body.message;

  let mailOptions = {
    to: [''], // Enter here the email address on which you want to send emails from your customers
    from: from,
    subject: subject,
    text: message,
    replyTo: from
  };

	console.log(mailOptions);

  if (from === '') {
    res.status(400);
    res.send({
    message: 'Bad request'
    });
    return;
  }

  if (subject === '') {
    res.status(400);
    res.send({
    message: 'Bad request'
    });
    return;
  }

  if (message === '') {
    res.status(400);
    res.send({
    message: 'Bad request'
    });
    return;
  }

  if (from) {
    mailOptions.to.push(from);
  }

  transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      res.end('error');
    } else {
      console.log('Message sent: ', response);
      res.end('sent');
    }
  });
});

app.listen(port, function () {
  console.log('Express started on port: ', port);
});
