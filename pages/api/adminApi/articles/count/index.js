/* eslint-disable import/no-anonymous-default-export */

import auth from "../../../../../component/middleware/middleware";
import db from "../../../../../utils/connectDB";


export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getArticleCount(req, res);
      break;
  }
};

const getArticleCount = async (req, res) => {
  const authData = await auth(req, res);
  try {
    if (authData.validated) {
      const sqlActive = `SELECT count(*) as active FROM articles JOIN users u on articles.user_id = u.user_id JOIN communities c on articles.community_id = c.community_id JOIN articles_likes_counter alc on articles.article_id = alc.article_id JOIN articles_comments_counter acc on articles.article_id = acc.article_id`;
      const sqlInActive = `SELECT count(*) as inActive FROM deleted_articles JOIN users u on deleted_articles.user_id = u.user_id JOIN communities c on deleted_articles.community_id = c.community_id JOIN articles_likes_counter alc on deleted_articles.article_id = alc.article_id JOIN articles_comments_counter acc on deleted_articles.article_id = acc.article_id`;
      db.query(sqlActive, (err, active) => {
          if (err) return res.status(500).json({err: err.message});
        db.query(sqlInActive, (err, InActive) => {
            if (err) {
              console.log(err);
            }
 
            res.status(201).json({...active[0], ...InActive[0]});
          });
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
