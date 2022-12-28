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
      await deleteReplyComment(req, res);
      break;
  }
};

const getReplyComment = async (req, res) => {
  let { story_comment_id, show } = await req.query;
  const sqlReplyCount = `SELECT COUNT(*) AS count
  FROM story_comments_reply JOIN users u on story_comments_reply.user_id = u.user_id WHERE u.status = 1 AND story_comment_id = ${story_comment_id}`;
  const sqlComment = `SELECT sc_reply_id,story_comment_id,sc_reply_text,story_id,story_comments_reply.created_at,u.user_id,full_name,username,email,avatar
  FROM story_comments_reply JOIN users u on story_comments_reply.user_id = u.user_id WHERE u.status = 1 AND story_comment_id = ${story_comment_id} ORDER BY sc_reply_id DESC LIMIT 4 OFFSET ${show}`;
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
  let { comment_id, replyComment, story_id, user_id } = await req.body;
  const authData = await auth(req, res);
  if (authData.validated) {
    const sqlPost = `INSERT INTO story_comments_reply (story_comment_id, sc_reply_text, user_id, story_id) VALUES (?,?,?,?)`;
    db.query(
      sqlPost,
      [comment_id, replyComment, user_id, story_id],
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

const deleteReplyComment = async (req, res) => {
  let { sc_reply_id } = await req.query;
  const authData = await auth(req, res);
  if (authData.validated) {
    const sqlPost = `DELETE FROM story_comments_reply where sc_reply_id = ${sc_reply_id}`;
    db.query(sqlPost, (err, documents) => {
      console.log(err)
      if (err)
        return res.status(500).json({
          success: false,
          message: ["Database Error"],
          error_code: 1106,
          data: {},
        });
      return res.status(201).json({
        success: true,
        message: ["Deleted Successfully"],
        data: {},
      });
    });
  }
};
