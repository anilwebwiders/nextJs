/* eslint-disable import/no-anonymous-default-export */

import auth from "../../../../../component/middleware/middleware";
import db from "../../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await article(req, res);
      break;
    case "DELETE":
      await articleDelete(req, res);
      break;
  }
};

const article = async (req, res) => {
  const {user_id} = await req.query;
  const {show} = await req.query;
  try {

      const sqlStory = `SELECT articles.article_id,title,redirect_link,source_text,img_link,description,c.community_id,c.community_title,articles.created_at,u.user_id,full_name,username,email,total_likes,total_comments, (SELECT count(*) FROM articles JOIN users u on articles.user_id = u.user_id JOIN communities c on articles.community_id = c.community_id JOIN articles_likes_counter alc on articles.article_id = alc.article_id JOIN articles_comments_counter acc on articles.article_id = acc.article_id WHERE articles.user_id = ${user_id}
      ) AS total_aticles FROM articles JOIN users u on articles.user_id = u.user_id JOIN communities c on articles.community_id = c.community_id JOIN articles_likes_counter alc on articles.article_id = alc.article_id JOIN articles_comments_counter acc on articles.article_id = acc.article_id WHERE articles.user_id = ${user_id} ORDER BY articles.article_id DESC LIMIT 12 OFFSET ${show};`;
      db.query(sqlStory, (err, documents) => {
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

const articleDelete = async (req, res) => {
  const {article_id} = await req.query;
  try {
    const authData = await auth(req, res);
    if (authData.validated) {
      const sqlStory = `DELETE FROM articles WHERE article_id = ${article_id};`
      db.query(sqlStory, (err, documents) => {
        if (err)  res.status(500).json({err: err.message});
        res.status(201).json({success: 'Deleted Successfully'});
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
