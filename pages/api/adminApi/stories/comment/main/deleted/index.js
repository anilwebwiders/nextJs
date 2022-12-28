/* eslint-disable import/no-anonymous-default-export */

import db from "../../../../../../../utils/connectDB";


export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getComment(req, res);
      break;
  }
};

const getComment = async (req, res) => {
  let { story_id, show } = await req.query;
  const sqlCount = `SELECT count(*) as count FROM deleted_stories_comments JOIN users u on deleted_stories_comments.user_id = u.user_id WHERE story_id = ${story_id};`
  const sqlComment = `SELECT story_comment_id,message,story_id,u.user_id,u.full_name,u.username,email,avatar,status,deleted_stories_comments.created_at,deleted_at FROM deleted_stories_comments JOIN users u on deleted_stories_comments.user_id = u.user_id WHERE story_id = ${story_id} ORDER BY story_comment_id DESC LIMIT 2 OFFSET ${show}`;
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

