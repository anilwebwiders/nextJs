/* eslint-disable import/no-anonymous-default-export */

import auth from "../../../../../component/middleware/middleware";
import db from "../../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await postReplyComment(req, res);
      break;
    case "GET":
      await getReplyComment(req, res);
      break;
    case "DELETE":
      await deleteCommentReply(req, res);
      break;
  }
};

const getReplyComment = async (req, res) => {
  let { article_comment_id, show } = await req.query;
  const sqlReplyCount = `SELECT COUNT(*) AS count
  FROM articles_comments_reply JOIN users u on articles_comments_reply.user_id = u.user_id WHERE u.status = 1 AND article_comment_id = ${article_comment_id}`;
  const sqlComment = `SELECT ac_reply_id,article_comment_id,ac_reply_text,article_id,articles_comments_reply.created_at,u.user_id,full_name,username,email,avatar
  FROM articles_comments_reply JOIN users u on articles_comments_reply.user_id = u.user_id WHERE u.status = 1 AND article_comment_id = ${article_comment_id} ORDER BY ac_reply_id DESC LIMIT 4 OFFSET ${show}`;
  db.query(sqlReplyCount, (err, count) => {
    if (err)
      return res.status(500).json({
        success: false,
        message: ["Database Error"],
        error_code: 1106,
        data: {},
      });
    db.query(sqlComment, (err, documents) => {
      if (err)
        return res.status(500).json({
          success: false,
          message: ["Database Error"],
          error_code: 1106,
          data: {},
        });
      res.send({ reply: documents, count: count });
    });
  });
};

const postReplyComment = async (req, res) => {
  let { article_comment_id, replyComment, article_id, user_id } =
    await req.body;
  const authData = await auth(req, res);
  if (authData.validated) {
    const sqlPost = `INSERT INTO articles_comments_reply (article_comment_id, ac_reply_text, user_id, article_id) VALUES (?,?,?,?)`;
    db.query(
      sqlPost,
      [article_comment_id, replyComment, user_id, article_id],
      (err, documents) => {
        if (err)
          return res.status(500).json({
            success: false,
            message: ["Database Error"],
            error_code: 1106,
            data: {},
          });
        res.send({ success: "sucess" });
      }
    );
  }
};

const deleteCommentReply = async (req, res) => {
  let { ac_reply_id } = await req.query;
  const authData = await auth(req, res);
  if (authData.validated) {
    const sqlPost = `DELETE FROM articles_comments_reply where ac_reply_id = ${ac_reply_id}`;
    db.query(sqlPost, (err, documents) => {
      if (err)
        return res.status(500).json({
          success: false,
          message: ["Database Error"],
          error_code: 1106,
          data: {},
        });
      return res.status(500).json({
        success: true,
        message: ["Successfully Deleted"],
        data: {},
      });
    });
  }
};
