/* eslint-disable import/no-anonymous-default-export */
import md5 from "md5";
import db from "../../../../utils/connectDB";
import emailAfterRegister from "../../../../utils/emailTemplates/registration-usage-tips.html";
import awsTransporter from "../../../../utils/awsTransporter";
import {
  createAccessToken,
  createRefreshToken,
} from "../../../../utils/generateToken";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await googlRegister(req, res);
      break;
  }
};

const googlRegister = async (req, res) => {
  let { name, googleId, email } = req.body;

  if (!name || !email || !googleId)
    return res.status(500).json({ err: "Please send all the fields." });

  const sqlEmailCheck = `SELECT * FROM users WHERE email = '${email}' and status = 1`;

  const matchEmail = email.includes("@gmail.com");

  if (matchEmail) {
    db.query(sqlEmailCheck, (err, existUser) => {
    if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });

      //check user
      if (existUser.length == 0) {
        let username = email.split("@")[0];
        const sqlCheck = `SELECT * from temporary_users WHERE email = '${email}'`;
        const sqlMainCheck = `SELECT * from users WHERE email = '${email}'`;
        const sqlInsertUser = `INSERT INTO  users (full_name,username,email,google_id,role) values(?,?,?,?,?)`;

        db.query(sqlCheck, (err, data) => {
        if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
          if (data.length > 0)
            if (data[0].email === email)
              return res.status(500).json({ err: "Email already registered." });

          db.query(sqlMainCheck, (err, mainData) => {
          if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });

            if (mainData.length > 0)
              if (mainData[0].email === email)
                return res
                  .status(500)
                  .json({ err: "Email already registered." });

            db.query(
              sqlInsertUser,
              [
                name,
                username.toLowerCase(),
                email.toLowerCase(),
                googleId,
                "user",
                imageUrl,
              ],
              (err, user) => {
              if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });

                //Registration tips

                const mailOptions = {
                  from: process.env.EM_USER,
                  to: email,
                  subject: "Welcome to FNMotivation Family! Please Read…",
                  html: emailAfterRegister,
                };

                awsTransporter.sendMail(mailOptions, function (err, info) {
                  if (err) return res.status(500).json({ err: err.message });
                });

                const userData = `SELECT * from users where email = '${email}'`;

                db.query(userData, (err, doc) => {
                  if (err) return res.status(500).json({ err: err.message });

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
                  const refresh_token = createRefreshToken({
                    user_id: user_id,
                  });

                  res.send({
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
                  });
                });
              }
            );
          });
        });
      } else if (existUser[0].google_id) {
        res.status(500).json({ err: "Account already registered" });
      } else {
        const sqlInsertUser = `UPDATE fnmotivation.users t SET t.google_id = ${googleId} WHERE email = '${email}'`;

        //Query User Data
        db.query(sqlInsertUser, [googleId], (err, user) => {
        if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
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
          } = existUser[0];

          const access_token = createAccessToken({ user_id: user_id });
          const refresh_token = createRefreshToken({ user_id: user_id });

          res.send({
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
          });
        });
      }
    });
  }
};
