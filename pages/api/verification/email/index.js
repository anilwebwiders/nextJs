/* eslint-disable import/no-anonymous-default-export */

import db from "../../../../utils/connectDB";
import makeid from "../../../../utils/generateKey";
import emailTemp from "../../../../utils/emailTemplates/code-send-for-pass.html";
import awsTransporter from "../../../../utils/awsTransporter";
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await Verification(req, res);
      break;
  }
};

const Verification = async (req, res) => {
  let email = await req.body.email;
  email = email.toLowerCase();
  const code = makeid(10);
  try {
    const sqlUser = `SELECT * from users where email = '${email}' AND status = 1`;
    const sqlCodeDelete = `DELETE from email_verification where email = '${email}'`;
    const sqlCode = `INSERT INTO  email_verification (email,verification_code) values(?,?)`;

    db.query(sqlUser, (err, user) => {
    if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
      if (user.length == 0)
        return res.status(500).json({ err: "User not found." });

      //Code Delete
      db.query(sqlCodeDelete, (err, documents) => {
      if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });

        //Email
        let emailData = emailTemp
          .replace("[personName]", user[0].username)
          .replace("[code]", code);

        const mailOptions = {
          from: process.env.EM_USER,
          to: email,
          subject: "FNMotivation password recovery",
          html: emailData,
        };

        awsTransporter.sendMail(mailOptions, function (err, info) {
          if (err) return res.status(500).json({ err: err.message });


          //Send to DB
          db.query(sqlCode, [email, code], (err, documents) => {
          if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
            if (documents.length == 0)
              return res.status(500).json({ err: "User not found." });
            return res
              .status(201)
              .json({ success: "Check your email for verification." });
          });

        });
      });
    });
  } catch (err) {
    return  res.status(500).json({
              success: false,
              message: ["Server Error"],
              error_code: 1000,
              data: {},
            });
  }
};
