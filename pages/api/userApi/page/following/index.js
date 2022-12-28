/* eslint-disable import/no-anonymous-default-export */
import auth from "../../../../../component/middleware/middleware";
import db from "../../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await following(req, res);
      break;
  
  }
};

const following = async (req, res) => {
  const {user_id, show} = await req.query;
  try {

      const sqlStory = `SELECT u.user_id,full_name,username,email,avatar  FROM followers JOIN users u on followers.user_id = u.user_id WHERE followers.follower_id = ${user_id} AND u.status = 1 ORDER BY follow_id DESC LIMIT 10 OFFSET ${show}`;
      db.query(sqlStory, (err, documents) => {
        if (err) return res.status(500).json({err: err.message});
        return res.status(201).json({
          success: true,
          message: ["Following List"],
          data: documents,
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
