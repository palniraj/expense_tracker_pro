const nodemailer = require("nodemailer");

const emailManager = async (to, text, html, subject) => {
  // configuration for nodemailer (trasporter)
  var transport = nodemailer.createTransport({
    host: process.env.smtp_host,
    port: process.env.smtp_port,
    auth: {
      user: process.env.smtp_user,
      pass: process.env.smtp_pass,
    },
  });
  // use it for sending email
  await transport.sendMail({
    to: to,
    from: "info@expensetracker.com",
    text: text,
    html: html,
    subject: subject,
  });
};
module.exports = emailManager;
