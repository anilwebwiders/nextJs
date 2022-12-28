/* eslint-disable import/no-anonymous-default-export */
import db from "../../../../utils/connectDB";
import {
  createAccessToken,
  createRefreshToken,
} from "../../../../utils/generateToken";
import emailAfterRegister from "../../../../utils/emailTemplates/registration-usage-tips.html";
import awsTransporter from "../../../../utils/awsTransporter";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await appleLogin(req, res);
      break;
  }
};

function uid(length) {
  var result = "";
  var characters = "1234567890";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const appleLogin = async (req, res) => {
  let { name, email, id } = await req.body;
  // console.log(req.body);
  if (email) {
    if (!name || !id)
      return res.status(500).json({
        success: false,
        message: ["Please send all the fields."],
        error_code: 1110,
        data: {},
      });

    const sqlEmailCheck = `SELECT * FROM users WHERE email = '${email}' and status = 1`;

    db.query(sqlEmailCheck, (err, existUser) => {
      if (err)
        return res.status(500).json({
          success: false,
          message: ["Database Error"],
          error_code: 1106,
          data: {},
        });

      //check user
      if (existUser.length == 0) {
        let username;
        if (!email) {
          email = id;
          let addID = makeid(4);
          username = `${name}.${addID}`;
        } else {
          username = email.split("@")[0];
        }
        const sqlCheck = `SELECT * from temporary_users WHERE email = '${email}'`;
        const sqlInsertUser = `INSERT INTO  users (full_name,username,email,apple_id,role) values(?,?,?,?,?)`;
        db.query(sqlCheck, (err, data) => {
          if (err)
            return res.status(500).json({
              success: false,
              message: ["Database Error"],
              error_code: 1106,
              data: {},
            });

          if (data.length > 0)
            return res
              .status(500)
              .json({ err: "Email already registered but not verified." });

          db.query(
            sqlInsertUser,
            [
              name,
              `${username.toLowerCase()}${uid(3)}`,
              email.toLowerCase(),
              id,
              "user",
            ],
            (err, user) => {
              if (err)
                return res.status(500).json({
                  success: false,
                  message: ["Database Error"],
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
                if (err)
                  return res.status(500).json({
                    success: false,
                    message: ["Database Error"],
                    error_code: 1106,
                    data: {},
                  });
              });

              const userData = `SELECT * from users where email = '${email}'`;

              db.query(userData, (err, doc) => {
                if (err)
                  return res.status(500).json({
                    success: false,
                    message: ["Database Error"],
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
                } = doc[0];

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
              });
            }
          );
        });
      } else {
        const sqlSelect = `SELECT * FROM users WHERE apple_id = '${id}' and status = 1`;

        db.query(sqlSelect, (err, doc) => {
          if (err)
            return res.status(500).json({
              success: false,
              message: ["Database Error"],
              error_code: 1106,
              data: {},
            });

          if (doc.length == 0) {
            const sqlInsertUser = `UPDATE fnmotivation.users t SET t.apple_id = ${id} WHERE email = '${email}'`;
            db.query(sqlInsertUser, [id], (err, user) => {
              if (err)
                return res.status(500).json({
                  success: false,
                  message: ["Database Error"],
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
          } else {
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
          }
        });
      }
    });
  } else if (!email) {
    const sqlIdCheck = `SELECT * FROM users WHERE apple_id = '${id}' and status = 1`;

    db.query(sqlIdCheck, (err, existUser) => {
      console.log(err);
      if (err)
        return res.status(500).json({
          success: false,
          message: ["Database Error"],
          error_code: 1106,
          data: {},
        });
      if (existUser.length == 0) {
        const sqlInsertUser = `INSERT INTO  users (full_name,username,apple_id,role) values(?,?,?,?)`;

        db.query(
          sqlInsertUser,
          [name, `${id}${uid(3)}`, id, "user"],
          (err, user) => {
            if (err)
              return res.status(500).json({
                success: false,
                message: ["Database Error"],
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

            const userData = `SELECT * from users where apple_id = '${id}'`;

            db.query(userData, (err, doc) => {
              console.log(err);
              if (err)
                return res.status(500).json({
                  success: false,
                  message: ["Database Error"],
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
              } = doc[0];

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
            });
          }
        );
      } else {
        const sqlSelect = `SELECT * FROM users WHERE apple_id = '${id}' and status = 1`;

        db.query(sqlSelect, (err, doc) => {
          if (err)
            return res.status(500).json({
              success: false,
              message: ["Database Error"],
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
          } = doc[0];

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
};
