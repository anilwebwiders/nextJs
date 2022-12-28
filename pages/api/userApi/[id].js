/* eslint-disable import/no-anonymous-default-export */
import db from "../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await user(req, res);
      break;
    case "DELETE":
      await deleteUser(req, res);
      break;
  }
};

const user = async (req, res) => {
  const { id } = await req.query;

  const sqlUser = `SELECT user_id, full_name, username, email, about, facebook_id, google_id, apple_id, facebook_authKey, google_authKey, apple_authKey, gender,role, avatar, subscribe_newsletter, created_at,status     from users where user_id =  ${id}`;

  db.query(sqlUser, (err, documents) => {
    if (err)
      return res.status(500).json({
        success: false,
        message: ["Database Error"],
        error_code: 1106,
        data: {},
      });
    return res.status(201).json({
      success: true,
      message: ["User Details"],
      data: documents,
    });
  });
};

const deleteUser = async (req, res) => {
  const id = await req.query.id;
  console.log(id);
  try {
    const sqlUser = `DELETE FROM users WHERE user_id = ${id}`;
    db.query(sqlUser, (err, documents) => {
      if (err)
        return res.status(500).json({
          success: false,
          message: ["Database Error"],
          error_code: 1106,
          data: {},
        });
      res.status(201).json({ success: true });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: ["Server Error"],
      error_code: 1000,
      data: {},
    });
  }
};
