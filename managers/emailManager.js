const nodemailer = require("nodemailer");

const emailManager = async (to, text, html, subject) => {
  // configuration for nodemailer (trasporter)
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ed3f281a1566dc",
      pass: "5f9692aed81837",
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
