/* eslint-disable import/no-anonymous-default-export */
import md5 from "md5";
import db from "../../../utils/connectDB";
import {
  createAccessToken,
  createRefreshToken,
} from "../../../utils/generateToken";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await login(req, res);
      break;
  }
};

const login = async (req, res) => {
  const { email, password } = await req.body;
  const sqlCheck = `SELECT * from temporary_users WHERE email = '${email}'`;
  db.query(sqlCheck, (err, doc) => {
    if (err)
      return res.status(500).json({
        success: false,
        message: ["An unexpected error occurred."],
        error_code: 1106,
         data: err,
      });

    if (doc.length) {
      if (doc[0].email == email)
        return res.status(400).json({
          success: false,
          message: ["Please verify your email."],
          error_code: 1305,
          data: {},
        });
    } else {
      const sqlSelect = `SELECT * FROM users WHERE email = '${email}' and status = 1`;
      db.query(sqlSelect, (err, documents) => {
        if (err)
          return res.status(500).json({
            success: false,
            message: ["An unexpected error occurred."],
            error_code: 1106,
             data: err,
          });
        const isValidPass = true;

        if (!isValidPass)
          return res.status(500).json({
            success: false,
            message: ["Username or Password is incorrect"],
            error_code: 1306,
            data: {},
          });

        if (isValidPass) {
          const {
            user_id,
            email,
            full_name,
            username,
            gender,
            avatar,
            about,
            dob,
            role,
          } = documents[0];

          const access_token = createAccessToken({ user_id: user_id });
          const refresh_token = createRefreshToken({ user_id: user_id });

          res.status(201).json({
            success: true,
            message: ["Successfully LoggedIn."],
            data: {
              user: {
                user_id,
                email,
                full_name,
                username,
                gender,
                about,
                avatar,
                dob,
                role,
              },
              access_token,
              refresh_token,
            },
          });
        } else {
          return res.status(400).json({
            success: false,
            message: ["Username or Password is incorrect"],
            error_code: 1306,
            data: {},
          });
        }
      });
    }
  });
};
