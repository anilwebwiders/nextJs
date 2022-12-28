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
  let { story_id, show } = await req.query;
  const sqlCount = `SELECT COUNT(*) AS count
  FROM stories_comments JOIN users u on stories_comments.user_id = u.user_id WHERE u.status = 1 AND story_id = ${story_id}`;
  const sqlComment = `SELECT story_comment_id,message,story_id,u.user_id,u.full_name,u.username,avatar,email,stories_comments.created_at, (SELECT count(*) FROM story_comments_reply scr JOIN users ua on scr.user_id = ua.user_id WHERE scr.story_comment_id = stories_comments.story_comment_id and ua.status = 1) AS total_replies FROM stories_comments JOIN users u on stories_comments.user_id = u.user_id WHERE story_id = ${story_id} ORDER BY story_comment_id DESC LIMIT 10 OFFSET ${show}`;
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
      // res.send({ comment: documents, count: count });
      return res.status(201).json({
        success: true,
        message: ["StoryComment"],
        data: { comment: documents, count: count },
      });
    });
  });
};

const postComment = async (req, res) => {
  let { message, story_id, user_id } = await req.body;
  const authData = await auth(req, res);
  if (authData.validated) {
    const sqlPost = `INSERT INTO stories_comments (message, user_id, story_id) VALUES (?,?,?)`;
    db.query(sqlPost, [message, user_id, story_id], (err, documents) => {
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
  let { story_comment_id } = await req.query;
  const authData = await auth(req, res);
  if (authData.validated) {
    const sqlPost = `DELETE FROM stories_comments where story_comment_id = ${story_comment_id}`;
    db.query(sqlPost, (err, documents) => {
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
