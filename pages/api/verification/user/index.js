/* eslint-disable import/no-anonymous-default-export */

import db from "../../../../utils/connectDB";
import accountActivated from "../../../../utils/emailTemplates/account-activated.html";
import emailAfterRegister from "../../../../utils/emailTemplates/registration-usage-tips.html";
import awsTransporter from "../../../../utils/awsTransporter";
import {
  createAccessToken,
  createRefreshToken,
} from "../../../../utils/generateToken";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await Verification(req, res);
      break;
  }
};

const Verification = async (req, res) => {
  const { code } = await req.body;
  try {
    const sqlUser = `SELECT * from email_verification where verification_code = '${code}'`;

    db.query(sqlUser, (err, documents) => {
      if (err)
        return res.status(500).json({
          success: false,
          message: ["Code search error"],
          error_code: 1106,
           data: err,
        });
      //Invalid Token
      if (documents.length == 0)
        return res.status(400).json({
          success: false,
          message: ["Token is invalid."],
          error_code: 1304,
          data: {},
        });
      //Is Verified
      const email = documents[0].email;
      const sqlUserVerify = `UPDATE fnmotivation.temporary_users t SET t.is_verified = 1  WHERE email = '${documents[0].email}'`;
      db.query(sqlUserVerify, (err, doc) => {
        if (err)
          return res.status(500).json({
            success: false,
            message: ["verify error"],
            error_code: 1106,
             data: err,
          });
        //Delete Temp User
        const sqlUserDeleteTemp = `DELETE FROM temporary_users WHERE is_verified = 1;`;
        const sqlCodeDelete = `DELETE FROM email_verification WHERE email = '${email}';`;
        db.query(sqlUserDeleteTemp, (err, deleted) => {
          if (err)
            return res.status(500).json({
              success: false,
              message: ["Temp user verify error"],
              error_code: 1106,
               data: err,
            });
          //Delete Code
          db.query(sqlCodeDelete, (err, deletedCode) => {
            if (err)
              return res.status(500).json({
                success: false,
                message: ["Delete code error"],
                error_code: 1106,
                 data: err,
              });

            //Email
            const mailOptions = {
              from: process.env.EM_USER,
              to: email,
              subject: "FNMotivation activated account successfully .",
              html: accountActivated,
            };

            awsTransporter.sendMail(mailOptions, function (err, info) {
              if (err)
                return res.status(400).json({
                  success: false,
                  message: ["Email not sent."],
                  error_code: 1303,
                  data: err,
                });
            });

            //Registration tips

            const mailOptionsTips = {
              from: process.env.EM_USER,
              to: email,
              subject: "Welcome to FNMotivation Family! Please Read…",
              html: emailAfterRegister,
            };

            awsTransporter.sendMail(mailOptionsTips, function (err, info) {
              if (err)
                return res.status(400).json({
                  success: false,
                  message: ["Email not sent."],
                  error_code: 1303,
                  data: err,
                });
            });

            const userData = `SELECT * from users where email = '${email}'`;

            db.query(userData, (err, doc) => {
              if (err)
                return res.status(500).json({
                  success: false,
                  message: ["User find error"],
                  error_code: 1106,
                   data: err,
                });

              const {
                user_id,
                email,
                full_name,
                username,
                gender,
                avatar,
                dob,
                role,
              } = doc[0];

              const access_token = createAccessToken({ user_id: user_id });
              const refresh_token = createRefreshToken({ user_id: user_id });

              res.status(201).json({
                success: true,
                message: ["Successfully Verified."],
                data: {
                  user: {
                    user_id,
                    email,
                    full_name,
                    username,
                    gender,
                    avatar,
                    dob,
                    role,
                  },
                  access_token,
                  refresh_token,
                },
              });
            });
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
