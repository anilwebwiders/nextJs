const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

export const transporterGmail = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EM_USER,
    pass: process.env.EM_PASS
  }
}));
