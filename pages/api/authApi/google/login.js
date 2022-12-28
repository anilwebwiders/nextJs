/* eslint-disable import/no-anonymous-default-export */
import db from "../../../../utils/connectDB";
import {
  createAccessToken,
  createRefreshToken,
} from "../../../../utils/generateToken";
import emailAfterRegister from "../../../../utils/emailTemplates/registration-usage-tips.html";
import awsTransporter from "../../../../utils/awsTransporter";


function uid(length) {
  var result = "";
  var characters = "1234567890";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await googleLogin(req, res);
      break;
  }
};

const googleLogin = async (req, res) => {
  let { name, googleId, email } = req.body;

  if (!name || !email || !googleId)
    return res.status(500).json({
      success: false,
      message: ["Please send all the fields."],
      error_code: 1110,
      data: {},
    });

  const sqlEmailCheck = `SELECT * FROM users WHERE email = '${email}' and status = 1`;
  db.query(sqlEmailCheck, (err, existUser) => {
    console.log(existUser)
    if (existUser.length == 0) {
      console.log("err")
      if (err)
        return res.status(500).json({
          success: false,
          message: ['Database Error'],
          error_code: 1106,
          data: {},
        });

      let username = email.split("@")[0];
      const sqlCheck = `SELECT * from temporary_users WHERE email = '${email}'`;
      const sqlInsertUser = `INSERT INTO  users (full_name,username,email,google_id,role) values(?,?,?,?,?)`;

      db.query(sqlCheck, (err, data) => {
        console.log(err)
        if (err)
          return res.status(500).json({
            success: false,
            message: ['Database Error'],
            error_code: 1106,
            data: {},
          });

        if (data.length > 0)
          return res.status(500).json({
            success: false,
            message: ["Email already registered but not verified"],
            error_code: 1110,
            data: {},
          });

        db.query(
          sqlInsertUser,
          [
            name,
            `${username.toLowerCase()}${uid(3)}`,
            email.toLowerCase(),
            googleId,
            "user"
          ],
          (err, user) => {
            console.log(err)
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
              console.log(err)
              if (err)
                return res.status(500).json({
                  success: false,
                  message: ['Database Error'],
                  error_code: 1106,
                  data: {},
                });
            });

            const userData = `SELECT * from users where email = '${email}'`;

            db.query(userData, (err, doc) => {
              console.log(err)
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

              return res.status(201).json({
                success: true,
                message: ["Registered Succussfully"],
                error_code: 1106,
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
          }
        );
      });
    } else {
      const sqlGoogleIdCheck = `SELECT * FROM users WHERE google_id = '${googleId}' and status = 1`;

      db.query(sqlGoogleIdCheck, (err, doc) => {
        console.log(err)
        if (err)
          return res.status(500).json({
            success: false,
            message: ['Database Error'],
            error_code: 1106,
            data: {},
          });

        if (doc.length > 0) {
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

          return res.status(201).json({
            success: true,
            message: ["Registered Succussfully"],
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
        } else {
          const sqlInsertUser = `UPDATE fnmotivation.users t SET t.google_id = ${googleId} WHERE email = '${email}'`;

          //Query User Data
          db.query(sqlInsertUser, [googleId], (err, user) => {
            console.log(err)
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
            } = user[0];

            const access_token = createAccessToken({ user_id: user_id });
            const refresh_token = createRefreshToken({ user_id: user_id });

            return res.status(201).json({
              success: true,
              message: ["Login Succussfully"],
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
        }
      });
    }
  });
};
