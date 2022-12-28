/* eslint-disable import/no-anonymous-default-export */

import db from "../../../../../../utils/connectDB";
import { changeText } from "../../../../../../utils/replace";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await article(req, res);
      break;
  }
};

const article = async (req, res) => {
  let {show, search, user_id }= await req.query;
  search = changeText(search)
  const sqlCount = `SELECT count(*) as count
  FROM articles JOIN users u on articles.user_id = u.user_id JOIN communities c on articles.community_id = c.community_id JOIN articles_likes_counter alc on articles.article_id = alc.article_id JOIN articles_comments_counter acc on articles.article_id = acc.article_id WHERE u.status = 1 AND (articles.title LIKE  ('%${search}%') OR articles.source_text LIKE ('%${search}%') OR articles.description LIKE ('%${search}%') ) AND u.user_id = ${user_id};`
  const sqlSearch = `SELECT articles.article_id,title,redirect_link,source_text,img_link,description,c.community_id,c.community_title,articles.created_at,u.user_id,full_name,username,email,total_likes,total_comments FROM articles JOIN users u on articles.user_id = u.user_id JOIN communities c on articles.community_id = c.community_id JOIN articles_likes_counter alc on articles.article_id = alc.article_id JOIN articles_comments_counter acc on articles.article_id = acc.article_id WHERE u.status = 1 AND (articles.title LIKE  ('%${search}%') OR articles.source_text LIKE ('%${search}%') OR articles.community_id LIKE ('%${search}%') ) AND u.user_id = ${user_id} ORDER BY articles.article_id  DESC LIMIT 12 OFFSET ${show};`;

  db.query(sqlCount, (err, count) => {
    if (err) {
      console.log(err);
    } 
    db.query(sqlSearch, (err, documents) => {
    if (err) return res.status(500).json({ err: err.message });
      res.send({data: documents, count: count[0].count});
    });
  });
};


