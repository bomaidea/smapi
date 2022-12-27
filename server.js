const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const host = process.env.host;
const provider = process.env.provider;
const user = process.env.user;
const pass = process.env.pass;
const to = process.env.to;

const transporter = nodemailer.createTransport({

  host: host,
  provider: provider,
  port: 465,
  secure: true,
  auth: {
    user: user, // Enter here email address from which you want to send emails
    pass: pass // Enter here password for email account from which you want to send emails
  },
  tls: {
    rejectUnauthorized: false
  }
});

app.use(bodyParser.json());

app.use((req, res, next) => {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/send', async (req, res) => {

  let from = user;
  let subject = 'portfolio request from ivansokolov.ch';
  let locale = req.body.locale;
  let email = req.body.email;
  const message = email + ' has requested a portfolio via ivansokolov.ch website language:' + locale;

  if (locale === '' || locale == null) {
    res.status(400);
    res.send({
      message: 'Bad request',
    });
    return;
  }

  if (email === '' || email == null) {
    res.status(400);
    res.send({
      message: 'Bad request'
    });
    return;
  }

  let mailOptions = {
    to: [to], // Enter here the email address on which you want to send emails from your customers
    from: from,
    subject: subject,
    text: message,
    replyTo: from
  };

  const confirmMessage = (locale==="it"?"Abbiamo ricevuto la tua richiesta di portfolio, riceverai il portfolio nei prossimi giorni su: ":"We received your portforlio request, you will receive the portfolio in the next days in your mailbox: ") + email + "\n\nIvan Sokolov"
  let confirmEmailOptions = {
    to: [email],
    from: from,
    subject: locale==="it"?"Abbiamo ricevuto la tua richiesta di portfolio":"We have received your portfolio request",
    text: confirmMessage,
    replyTo: from,
  };
  if (from) {
    mailOptions.to.push(from);
  }

  await transporter.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send({messsage:'Error while sending email.'});
    } else {
      res.send({message:'Successfully sent email.'});
      confirmEmailOptions.to.push(from);
      transporter.sendMail(confirmEmailOptions, (error, response) => {
        if (error) {
          console.log("Error sending confirmation email");
        } else {
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log('Express started on port: ', port);
});