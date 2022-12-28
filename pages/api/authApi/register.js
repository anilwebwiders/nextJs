/* eslint-disable import/no-anonymous-default-export */
import md5 from "md5";
import db from "../../../utils/connectDB";
import makeid from "../../../utils/generateKey";
import emailActiveAcount from "../../../utils/emailTemplates/account-active.html";
import awsTransporter from "../../../utils/awsTransporter";
import { validRegister } from "../../../component/middleware/valid";
import moment from "moment";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await register(req, res);
      break;
  }
};

const register = async (req, res) => {
  let { fullname, username, email, password, gender, dob, cf_password } = req.body;

  dob = moment(new Date(dob)).format('MM/DD/YYYY')

  const error = await validRegister({fullname, username, email, password, gender, dob, cf_password});
  if (error.message.length > 0) return res.status(400).json(error);

  const code = makeid(10);

  const sqlCheck = `SELECT * from temporary_users WHERE email = '${email}' or username = '${username}'`;
  const sqlMainCheck = `SELECT * from users WHERE email = '${email}' or username = '${username}'`;
  const sqlInsertUser = `INSERT INTO  temporary_users (full_name,username,email,password,gender,role,dob) values(?,?,?,?,?,?,?)`;
  const sqlCode = `INSERT INTO  email_verification (email,verification_code) values(?,?)`;

  // Temporary Database
  db.query(sqlCheck, (err, data) => {
    console.log(err)
    if (err)
      return res.status(500).json({
        success: false,
        message: ["Check Temporary email error"],
        error_code: 1106,
         data: err,
      });

    // Email Check
    if (data.length > 0)
      if (data[0].email === email)
        return res.status(400).json({
          success: false,
          message: ["Email already in use."],
          error_code: 1302,
          data: {},
        });

    // USername Check
    if (data.length > 0)
      if (data[0].username === username)
        return res.status(400).json({
          success: false,
          message: ["Username already taken."],
          error_code: 1303,
          data: {},
        });

    // User Database
    db.query(sqlMainCheck, (err, mainData) => {
      console.log(err)
      if (err)
        return res.status(500).json({
          success: false,
          message: ["Checking user error"],
          error_code: 1106,
           data: err,
        });

      // Email Check
      if (mainData.length > 0)
        if (mainData[0].email === email)
          return res.status(400).json({
            success: false,
            message: ["Email already in use."],
            error_code: 1302,
            data: {},
          });

      // USername Check
      if (mainData.length > 0)
        if (mainData[0].username === username)
          return res.status(400).json({
            success: false,
            message: ["Username already taken."],
            error_code: 1303,
            data: {},
          });

      //Mail
      let emailTemp = emailActiveAcount
        .replace("[personName]", fullname)
        .replace("[token]", code);
      const mailOptions = {
        from: process.env.EM_USER,
        to: email,
        subject: "FNMotivation active your account",
        html: emailTemp,
      };

      // Email
      awsTransporter.sendMail(mailOptions, function (err, info) {
        if (err)
          return res.status(400).json({
            success: false,
            message: ["Email not sent."],
            error_code: 1303,
            data: err,
          });

        //Suubmit
        db.query(
          sqlInsertUser,
          [
            fullname,
            username.toLowerCase(),
            email.toLowerCase(),
            md5(password),
            gender,
            "user",
            dob,
          ],
          (err, user) => {
            console.log(err)
            if (err)
              return res.status(500).json({
                success: false,
                message: ["Insert user error"],
                error_code: 1106,
                 data: err,
              });
            db.query(sqlCode, [email.toLowerCase(), code], (err, code) => {
              console.log(err);
              if (err)
                return res.status(500).json({
                  success: false,
                  message: ["Code generate error"],
                  error_code: 1106,
                   data: err,
                });
              res.status(201).json({
                success: true,
                message:
                  ["Registered Successfully, Check your email to verify your account."],
                data: {},
              });
            });
          }
        );
      });
    });
  });
};
