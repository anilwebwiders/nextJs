/* eslint-disable import/no-anonymous-default-export */

import auth from "../../../../../component/middleware/middleware";
import db from "../../../../../utils/connectDB";



export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getSearch(req, res);
      break;
  }
};

const getSearch = async (req, res) => {
  const { order, page, status, community, search } = req.query;
  const authData = await auth(req, res);
  try {
    if (authData.validated) {
      if (status === "1") {
          const sqlCount = `SELECT count(*) as count FROM articles JOIN users u on articles.user_id = u.user_id JOIN communities c on articles.community_id = c.community_id JOIN articles_likes_counter alc on articles.article_id = alc.article_id JOIN articles_comments_counter acc on articles.article_id = acc.article_id ${community != '0' ? `WHERE c.community_id = ${community}` : ''} AND (articles.title LIKE  ('%${search}%') OR articles.source_text LIKE ('%${search}%') OR articles.description LIKE ('%${search}%') )`;
          const sqlArticle = `SELECT articles.article_id,title,redirect_link,source_text,img_link,description,c.community_id,community_title,articles.created_at,u.user_id,full_name,username,email,status,total_likes,total_comments FROM articles JOIN users u on articles.user_id = u.user_id JOIN communities c on articles.community_id = c.community_id JOIN articles_likes_counter alc on articles.article_id = alc.article_id JOIN articles_comments_counter acc on articles.article_id = acc.article_id ${community != '0' ? `WHERE c.community_id = ${community}` : ''} AND (articles.title LIKE  ('%${search}%') OR articles.source_text LIKE ('%${search}%') OR articles.description LIKE ('%${search}%') ) ORDER BY articles.article_id ${order} LIMIT 12 OFFSET ${page}`;
          db.query(sqlArticle, (err, article) => {
            if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
              db.query(sqlCount, (err, count) => {
              if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
                res.status(201).json({article: article, count: count[0].count});
              });
            });
        } else if (status === "0"){
            const sqlCount = `SELECT count(*) as count FROM deleted_articles JOIN users u on deleted_articles.user_id = u.user_id JOIN communities c on deleted_articles.community_id = c.community_id JOIN articles_likes_counter alc on deleted_articles.article_id = alc.article_id JOIN articles_comments_counter acc on deleted_articles.article_id = acc.article_id ${community != '0' ? `WHERE c.community_id = ${community}` : ''} AND (deleted_articles.title LIKE  ('%${search}%') OR deleted_articles.source_text LIKE ('%${search}%') OR deleted_articles.description LIKE ('%${search}%') )`;
          const sqlStory = `SELECT deleted_articles.article_id,title,redirect_link,source_text,img_link,description,c.community_id,community_title,deleted_articles.created_at,deleted_at,u.user_id,full_name,username,email,status,total_likes,total_comments FROM deleted_articles JOIN users u on deleted_articles.user_id = u.user_id JOIN communities c on deleted_articles.community_id = c.community_id JOIN articles_likes_counter alc on deleted_articles.article_id = alc.article_id JOIN articles_comments_counter acc on deleted_articles.article_id = acc.article_id ${community != '0' ? `WHERE c.community_id = ${community}` : ''} AND (deleted_articles.title LIKE  ('%${search}%') OR deleted_articles.source_text LIKE ('%${search}%') OR deleted_articles.description LIKE ('%${search}%') ) ORDER BY deleted_articles.article_id ${order} LIMIT 12 OFFSET ${page}`;
          db.query(sqlStory, (err, article) => {
          if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
            db.query(sqlCount, (err, count) => {
            if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
              res.status(201).json({article: article, count: count[0].count});
            });
          });
      }
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

