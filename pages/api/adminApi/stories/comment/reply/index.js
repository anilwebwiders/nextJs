/* eslint-disable import/no-anonymous-default-export */

import db from "../../../../../../utils/connectDB";



export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getCommentReply(req, res);
      break;
  }
};

const getCommentReply = async (req, res) => {
  let { story_comment_id, show } = await req.query;
  const sqlCount = `SELECT COUNT(*) AS count
  FROM story_comments_reply JOIN users u on story_comments_reply.user_id = u.user_id WHERE story_comment_id = ${story_comment_id};`
  const sqlComment = `SELECT sc_reply_id,story_comment_id,sc_reply_text,story_id,story_comments_reply.created_at,u.user_id,full_name,username,avatar,email,status
  FROM story_comments_reply JOIN users u on story_comments_reply.user_id = u.user_id WHERE story_comment_id = ${story_comment_id} ORDER BY sc_reply_id DESC LIMIT 2 OFFSET ${show}`;
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
      res.send({reply: documents, count: count});
    });
  });
};

