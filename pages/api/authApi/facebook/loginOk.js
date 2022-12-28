/* eslint-disable import/no-anonymous-default-export */
import db from "../../../../utils/connectDB";
import { createAccessToken, createRefreshToken } from "../../../../utils/generateToken";
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await facebookLogin(req, res);
      break;
  }
};

const facebookLogin = async (req, res) => {
  const { id } = req.query;

  
  if(!id) return res.status(500).json({ err: 'Please send all the fields.' });

  const sqlSelect = `SELECT * FROM users WHERE facebook_id = '${id}' and status = 1`;
  db.query(sqlSelect, (err, doc) => {
  if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });

    if(doc.length == 0) return res.status(500).json({ err: 'User not found' });

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
};
