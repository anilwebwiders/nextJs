/* eslint-disable import/no-anonymous-default-export */
import db from "../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getArticleDetails(req, res);
      break;
  }
};

const getArticleDetails = async (req, res) => {
  const { article_id, user_id } = await req.query;
  const sqlSelect = `SELECT articles.article_id,title,redirect_link,source_text,img_link,description,c.community_id,community_title,articles.created_at,u.user_id,full_name,username,avatar,email,total_likes,total_comments FROM articles JOIN users u on articles.user_id = u.user_id JOIN communities c on articles.community_id = c.community_id JOIN articles_likes_counter alc on articles.article_id = alc.article_id JOIN articles_comments_counter acc on articles.article_id = acc.article_id WHERE u.status = 1 AND articles.article_id = ${article_id};`;

  const sqlSelectWithUser = `SELECT articles.article_id,title,redirect_link,source_text,img_link,description,c.community_id,community_title,articles.created_at,
  u.user_id,full_name,avatar,username,email,total_likes,total_comments,
    (SELECT count(*) FROM articles_likes WHERE articles_likes.article_id = articles.article_id AND articles_likes.user_id =${user_id}) 
    AS liked,(SELECT count(*) FROM articles_bookmarks WHERE articles_bookmarks.article_id = articles.article_id AND articles_bookmarks.user_id =${user_id}) 
    AS bookmarked,(SELECT count(*) FROM followers WHERE followers.user_id = u.user_id 
    AND followers.follower_id =${user_id}) AS followed FROM articles JOIN users u on articles.user_id = u.user_id 
    JOIN communities c on articles.community_id = c.community_id JOIN articles_likes_counter alc on articles.article_id = alc.article_id 
    JOIN articles_comments_counter acc on articles.article_id = acc.article_id WHERE u.status = 1 AND articles.article_id = ${article_id};`;

  if (user_id != "undefined") {
    db.query(sqlSelectWithUser, (err, documents) => {
      if (err) return res.status(500).json({ err: err.message });
      console.log(documents[0])
      return res.status(201).json({
        success: true,
        message: "",
        data: documents[0],
      });
    });
  } else {
    db.query(sqlSelect, (err, documents) => {
      if (err) return res.status(500).json({ err: err.message });
      return res.status(201).json({
        success: true,
        message: "",
        data: documents[0],
      });
    });
  }
};
