const express = require("express");
const cors = require("cors");

require("dotenv").config();
const secret = process.env.SECRET_JWT;

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
app.post('/send-email', (req, res) => {
  const emails_string = req.body.emails;
  const emails = emails_string.split(',');
  const subject = req.body.subject;
  const body = req.body.body;
  const msg = {
    to: emails,
    from: process.env.SENDER_EMAIL,
    subject: subject,
    text: body,
  }
  sgMail
    .send(msg)
    .then(() => {
      res.send('Email sent successfully!');
    })
    .catch((error) => {
      res.status(400).send(JSON.stringify(error));
    })
});
app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});