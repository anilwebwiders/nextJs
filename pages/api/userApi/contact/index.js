/* eslint-disable import/no-anonymous-default-export */

import awsTransporter from "../../../../utils/awsTransporter";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await submit(req, res);
      break;
  }
};

const submit = async (req, res) => {
  const { name, email, message, subject } = await req.body;
  const mailOptions = {
    from: process.env.EM_USER,
    to: email,
    subject: subject,
    html: `<p>Name: ${name}</p>
     <p>Email: ${email}</p>
     <p>Subject: ${subject}</p>
     <p>Message: ${message}</p>`,
  };

  awsTransporter.sendMail(mailOptions, function (err, info) {
    if (err) return res.status(500).json({ err: err.message });

    res.send({ success: "Mailed Successfully" });
  });
};
