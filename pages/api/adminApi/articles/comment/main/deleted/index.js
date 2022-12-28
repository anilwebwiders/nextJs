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
  let { article_id, show } = await req.query;
  const sqlCount = `SELECT count(*) as count
  FROM deleted_articles_comments JOIN users u on deleted_articles_comments.user_id = u.user_id WHERE article_id = ${article_id};`
  const sqlComment = `SELECT article_comment_id,message,article_id,deleted_articles_comments.created_at,deleted_at,u.user_id,full_name,username,email,avatar,status
  FROM deleted_articles_comments JOIN users u on deleted_articles_comments.user_id = u.user_id WHERE article_id = ${article_id} ORDER BY article_comment_id DESC LIMIT 2 OFFSET ${show}`;
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

