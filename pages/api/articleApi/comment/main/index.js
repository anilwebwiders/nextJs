/* eslint-disable import/no-anonymous-default-export */

import auth from "../../../../../component/middleware/middleware";
import db from "../../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await postComment(req, res);
      break;
    case "GET":
      await getComment(req, res);
      break;
    case "DELETE":
      await deleteComment(req, res);
      break;
  }
};

const getComment = async (req, res) => {
  let { article_id, show } = await req.query;
  const sqlCount = `SELECT COUNT(*) AS count
  FROM articles_comments JOIN users u on articles_comments.user_id = u.user_id WHERE u.status = 1 AND article_id = ${article_id}`;
  const sqlComment = `SELECT article_comment_id,message,article_id,articles_comments.created_at,u.user_id,full_name,avatar,username,email, 
  (SELECT COUNT(*) FROM articles_comments_reply acr JOIN users u2 on acr.user_id = u2.user_id WHERE u2.status = 1
  AND acr.article_comment_id = articles_comments.article_comment_id) as total_replys FROM articles_comments JOIN users u on articles_comments.user_id = u.user_id WHERE u.status = 1 AND article_id = ${article_id}
  ORDER BY article_comment_id DESC LIMIT 10 OFFSET ${show}`;
  db.query(sqlCount, (err, count) => {
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
      return res.status(201).json({
        success: true,
        message: ["Article Comment"],
        data: { comment: documents, count: count },
      });
    });
  });
};

const postComment = async (req, res) => {
  let { message, article_id, user_id } = await req.body;
  const authData = await auth(req, res);
  if (authData.validated) {
    const sqlPost = `INSERT INTO articles_comments (message, user_id, article_id) VALUES (?,?,?)`;
    db.query(sqlPost, [message, user_id, article_id], (err, documents) => {
      console.log(err);
      if (err)
        return res.status(500).json({
          success: false,
          message: ["Database Error"],
          error_code: 1106,
          data: {},
        });
      res.send({ success: "sucess" });
    });
  }
};

const deleteComment = async (req, res) => {
  let { article_comment_id } = await req.query;
  const authData = await auth(req, res);
  if (authData.validated) {
    const sqlPost = `DELETE FROM articles_comments where article_comment_id = ${article_comment_id}`;
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
