/* eslint-disable import/no-anonymous-default-export */

import db from "../../../../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getCommentReply(req, res);
      break;
  }
};

const getCommentReply = async (req, res) => {
  let { article_comment_id, show } = await req.query;
  const sqlCount = `SELECT count(*)
  FROM deleted_articles_comments_reply JOIN users u on deleted_articles_comments_reply.user_id = u.user_id WHERE article_comment_id = ${article_comment_id}`;
  const sqlComment = `SELECT ac_reply_id,article_comment_id,ac_reply_text,article_id,deleted_articles_comments_reply.created_at,deleted_at,u.user_id,full_name,avatar,username,email,role
  FROM deleted_articles_comments_reply JOIN users u on deleted_articles_comments_reply.user_id = u.user_id WHERE article_comment_id = ${article_comment_id} ORDER BY ac_reply_id DESC LIMIT 2 OFFSET ${show}`;
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
      res.send({ reply: documents, count: count });
    });
  });
};
