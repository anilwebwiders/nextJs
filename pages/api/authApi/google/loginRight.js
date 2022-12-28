/* eslint-disable import/no-anonymous-default-export */
import db from "../../../../utils/connectDB";
import {
  createAccessToken,
  createRefreshToken,
} from "../../../../utils/generateToken";
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await googleLogin(req, res);
      break;
  }
};

const googleLogin = async (req, res) => {
  const { id, email } = req.query;

  if(!id || !email ) return res.status(500).json({ err: 'Please send all the fields.' });

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

      if (existUser.length == 0)
        return res.status(500).json({ err: "User not found" });

      const sqlInsertUser = `UPDATE fnmotivation.users t SET t.google_id = ${id} WHERE email = '${email}'`;

      db.query(sqlInsertUser, [id], (err, user) => {

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

    });
  } else {
    const sqlSelect = `SELECT * FROM users WHERE google_id = '${id}' and status = 1`;
    db.query(sqlSelect, (err, doc) => {
    if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });

      if (doc.length == 0)
        return res.status(500).json({ err: "User not found" });

      const { user_id, email, full_name, username, gender, avatar, dob, role } =
        doc[0];

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
};
