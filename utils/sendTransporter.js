let nodemailer = require('nodemailer');
let sendTransporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'claud.miller@ethereal.email',
        pass: 'EtCGk32eBwtZT8wt7q'
    }
});

module.exports = sendTransporter