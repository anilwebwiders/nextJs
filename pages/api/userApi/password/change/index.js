/* eslint-disable import/no-anonymous-default-export */

import db from "../../../../../utils/connectDB";
import md5 from "md5";
import emailTemp from '../../../../../utils/emailTemplates/password-changed.html'
import auth from "../../../../../component/middleware/middleware";
import awsTransporter from "../../../../../utils/awsTransporter";
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await postPass(req, res);
      break;
    case "PATCH":
      await patchPass(req, res);
      break;
  }
};

const postPass = async (req, res) => {
  const { user_id, new_password, old_password, email } = await req.body;
  try {
    const authData = await auth(req, res);
    if (authData.validated) {
      const sqlCheck = `Select password from users where user_id = ${user_id}`;
      const sqlUser = `UPDATE fnmotivation.users t SET t.password = '${md5(
        new_password
      )}' where user_id = ${user_id}`;

      db.query(sqlCheck, (err, documents) => {
      if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
        if (documents[0].password !== md5(old_password))
          return res.status(500).json({ err: "Invalid Password" });
        db.query(sqlUser, (err, changed) => {
        if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });

          //EMail
        const mailOptions = {
          from: process.env.EM_USER,
          to: email,
          subject: 'FNMotivation Password Changed Successfully .',
          html: emailTemp,
        };
      
        awsTransporter.sendMail(mailOptions, function (err, info) {
          if (err) return res.status(500).json({ err: err.message });
         
        });
        
          res.status(201).json({ success: "Password changed successfully" });
        });
      });
    }
  } catch (err) {
    return  res.status(500).json({
              success: false,
              message: ["Server Error"],
              error_code: 1000,
              data: {},
            });
  }
};

const patchPass = async (req, res) => {
  const { email, password } = await req.body;

  try {
    const sqlUser = `UPDATE fnmotivation.users t SET t.password = '${md5(
      password
    )}' where email = '${email}'`;

    const sqlCodeDelete = `DELETE FROM email_verification WHERE email = '${email}';`;

    db.query(sqlCodeDelete, (err, changed) => {
    if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });

      db.query(sqlUser, (err, user) => {
      if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });

        //EMail
        const mailOptions = {
          from: process.env.EM_USER,
          to: email,
          subject: 'FNMotivation Password Changed Successfully .',
          html: emailTemp,
        };
      
        awsTransporter.sendMail(mailOptions, function (err, info) {
          if (err) return res.status(500).json({ err: err.message });
         
        });
        res.status(201).json({ success: "Password changed successfully" });
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
