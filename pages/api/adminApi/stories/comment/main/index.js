/* eslint-disable import/no-anonymous-default-export */

import db from "../../../../../../utils/connectDB";



export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getComment(req, res);
      break;
  }
};

const getComment = async (req, res) => {
  let { story_id, show } = await req.query;

  const sqlCount = `SELECT COUNT(*) AS count
  FROM stories_comments JOIN users u on stories_comments.user_id = u.user_id WHERE u.status = 1 AND story_id = ${story_id}`
  const sqlComment = `SELECT story_comment_id,message,story_id,stories_comments.created_at,u.user_id,full_name,username,email,avatar
  FROM stories_comments JOIN users u on stories_comments.user_id = u.user_id WHERE u.status = 1 AND story_id = ${story_id} ORDER BY story_comment_id DESC LIMIT 2 OFFSET ${show}`;
  db.query(sqlCount, (err, count) => {
  if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
    db.query(sqlComment, (err, documents) => {
    if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
      res.send({comment: documents, count: count});
    });
  });
};

