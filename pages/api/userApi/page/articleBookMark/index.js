/* eslint-disable import/no-anonymous-default-export */

import auth from "../../../../../component/middleware/middleware";
import db from "../../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await articleBookMark(req, res);
      break;
    case "POST":
      await articleBookMarkDelete(req, res);
      break;
  }
};

const articleBookMark = async (req, res) => {
  const {user_id} = await req.query;
  const {show} = await req.query;
  try {

      const sqlArticle = `SELECT a.article_id,title,redirect_link,source_text,img_link,description,c.community_id,c.community_title,a.created_at,u.user_id,full_name,username,email,total_likes,total_comments, (SELECT COUNT(*) FROM articles_bookmarks JOIN articles a on articles_bookmarks.article_id = a.article_id JOIN users u on a.user_id = u.user_id JOIN communities c on a.community_id = c.community_id JOIN articles_likes_counter alc on a.article_id = alc.article_id JOIN articles_comments_counter acc on a.article_id = acc.article_id WHERE u.status = 1 and articles_bookmarks.user_id = ${user_id}
      ) AS total_article_bookmark FROM articles_bookmarks JOIN articles a on articles_bookmarks.article_id = a.article_id JOIN users u on a.user_id = u.user_id JOIN communities c on a.community_id = c.community_id JOIN articles_likes_counter alc on a.article_id = alc.article_id JOIN articles_comments_counter acc on a.article_id = acc.article_id WHERE u.status = 1 AND articles_bookmarks.user_id = ${user_id} ORDER BY articles_bookmarks.p_bookmark_id DESC LIMIT 12 OFFSET ${show};`;
      db.query(sqlArticle, (err, documents) => {
        if (err)  res.status(500).json({err: err.message});
        res.status(201).json(documents);
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

const articleBookMarkDelete = async (req, res) => {
  const {article_id, user_id} = await req.body;

  try {
    const authData = await auth(req, res);
    if (authData.validated) {
      const sqlStory = `CALL auto_article_bookmark(${article_id}, ${user_id});`
      db.query(sqlStory, (err, documents) => {
        if (err)  res.status(500).json({err: err.message});
        res.status(201).json({success: true});
      });
    }
  } catch (err) {
    return  res.status(500).json({
              success: false,
              message: ["Server Error"],
              error_code: 1000,
              data: {},
            });
  }
};
