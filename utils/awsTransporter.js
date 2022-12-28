// let nodemailer = require('nodemailer');
// let awsTransporter = nodemailer.createTransport({
//     host: 'email-smtp.us-east-1.amazonaws.com',
//     port: 25,
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });

// module.exports = awsTransporter

let AWS = require("aws-sdk");
let nodemailer = require("nodemailer");


AWS.config.update({
  accessKeyId: process.env.AWS_ACCESSKEY,
  secretAccessKey: process.env.AWS_SECRETKEY,
  region: process.env.AWS_REGION,
});

// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
  SES: new AWS.SES({
    apiVersion: "2010-12-01",
  }),
});

module.exports = transporter;
