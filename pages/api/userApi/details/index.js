import auth from "../../../../component/middleware/middleware";
import db from "../../../../utils/connectDB";

/* eslint-disable import/no-anonymous-default-export */

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

  const authData = await auth(req, res);
  const follower_id = authData.user_id;

  const sqlUser = `SELECT user_id, full_name, username, email, about, facebook_id, google_id, apple_id, facebook_authKey, google_authKey, apple_authKey, gender,role, avatar, subscribe_newsletter, created_at,status   from users where user_id =  ${id}`;
  const sqlUserWithUser = `SELECT u.user_id, full_name, username, avatar, email, about, facebook_id, google_id, apple_id, 
  facebook_authKey, google_authKey, apple_authKey, gender,role, avatar, subscribe_newsletter, created_at,status,
  (SELECT count(*) FROM followers WHERE followers.user_id = u.user_id AND followers.follower_id = ${follower_id}) 
  AS followed  from users u where user_id =  ${id};`;

  console.log(follower_id, id);

  if (id == follower_id) {
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
  } else {
    db.query(sqlUserWithUser, (err, follow) => {
      if (err)
        return res.status(500).json({
          success: false,
          message: ["Database Error"],
          error_code: 1106,
          data: {},
        });
      //   db.query(sqlUser, (err, documents) => {
      //     if (err)
      //       return res.status(500).json({
      //         success: false,
      //         message: ["Database Error"],
      //         error_code: 1106,
      //         data: {},
      //       });
      return res.status(201).json({
        success: true,
        message: ["User Details"],
        data: follow,
      });
      //   });
    });
  }
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
