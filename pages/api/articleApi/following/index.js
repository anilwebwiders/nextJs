/* eslint-disable import/no-anonymous-default-export */
import db from "../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await followingArticle(req, res);
      break;
  }
};

const followingArticle = async (req, res) => {
  let {page, type, user_id} = await req.query

  const sqlComCount = `SELECT count(*) as count
  FROM followers JOIN articles a on followers.user_id = a.user_id JOIN communities c on a.community_id = c.community_id JOIN users u on a.user_id = u.user_id JOIN articles_likes_counter alc on a.article_id = alc.article_id JOIN articles_comments_counter acc on a.article_id = acc.article_id WHERE u.status = 1 AND followers.follower_id = ${user_id} AND c.community_id = ${type}`
  const sqlSelectWithCom = `SELECT a.article_id,title,redirect_link,source_text,img_link,description,c.community_id,c.community_title,a.created_at,total_likes,total_comments,u.user_id,full_name,username,email FROM followers JOIN articles a on followers.user_id = a.user_id JOIN communities c on a.community_id = c.community_id JOIN users u on a.user_id = u.user_id JOIN articles_likes_counter alc on a.article_id = alc.article_id JOIN articles_comments_counter acc on a.article_id = acc.article_id WHERE u.status = 1 AND followers.follower_id = ${user_id} AND c.community_id = ${type} ORDER BY a.article_id DESC LIMIT 12 OFFSET ${page};`
  const sqlCount = `SELECT count(*) as count
  FROM followers JOIN articles a on followers.user_id = a.user_id JOIN communities c on a.community_id = c.community_id JOIN users u on a.user_id = u.user_id JOIN articles_likes_counter alc on a.article_id = alc.article_id JOIN articles_comments_counter acc on a.article_id = acc.article_id WHERE u.status = 1 AND followers.follower_id = ${user_id}`
  const sqlSelect = `SELECT a.article_id,title,redirect_link,source_text,img_link,description,c.community_id,c.community_title,a.created_at,total_likes,total_comments,u.user_id,full_name,username,email FROM followers JOIN articles a on followers.user_id = a.user_id JOIN communities c on a.community_id = c.community_id JOIN users u on a.user_id = u.user_id JOIN articles_likes_counter alc on a.article_id = alc.article_id JOIN articles_comments_counter acc on a.article_id = acc.article_id WHERE u.status = 1 AND followers.follower_id = ${user_id} ORDER BY a.article_id DESC LIMIT 12 OFFSET ${page};`

  const sqlSelectWithUserCom = `SELECT a.article_id,title,redirect_link,source_text,img_link,description,c.community_id,c.community_title,a.created_at,total_likes,total_comments,u.user_id,full_name,username,email,(SELECT count(*) FROM articles_likes WHERE articles_likes.article_id = a.article_id AND articles_likes.user_id =${user_id}) AS liked,(SELECT count(*) FROM articles_bookmarks WHERE articles_bookmarks.article_id = a.article_id AND articles_bookmarks.user_id =${user_id}) AS bookmarked,(SELECT count(*) FROM followers WHERE followers.user_id = u.user_id AND followers.follower_id =${user_id}) AS followed
  FROM followers JOIN articles a on followers.user_id = a.user_id JOIN communities c on a.community_id = c.community_id JOIN users u on a.user_id = u.user_id JOIN articles_likes_counter alc on a.article_id = alc.article_id JOIN articles_comments_counter acc on a.article_id = acc.article_id WHERE u.status = 1 AND followers.follower_id = ${user_id} AND c.community_id = ${type} ORDER BY a.article_id DESC   12 OFFSET ${page}`;

  const sqlSelectWithUser = `SELECT a.article_id,title,redirect_link,source_text,img_link,description,c.community_id,c.community_title,a.created_at,total_likes,total_comments,u.user_id,full_name,username,email,(SELECT count(*) FROM articles_likes WHERE articles_likes.article_id = a.article_id AND articles_likes.user_id =${user_id}) AS liked,(SELECT count(*) FROM articles_bookmarks WHERE articles_bookmarks.article_id = a.article_id AND articles_bookmarks.user_id =${user_id}) AS bookmarked,(SELECT count(*) FROM followers WHERE followers.user_id = u.user_id AND followers.follower_id =${user_id}) AS followed
  FROM followers JOIN articles a on followers.user_id = a.user_id JOIN communities c on a.community_id = c.community_id JOIN users u on a.user_id = u.user_id JOIN articles_likes_counter alc on a.article_id = alc.article_id JOIN articles_comments_counter acc on a.article_id = acc.article_id WHERE u.status = 1 AND followers.follower_id = ${user_id}  ORDER BY a.article_id DESC    LIMIT 12 OFFSET ${page};`;

  
  if (type === "0") {
    if (user_id != "undefined") {
      db.query(sqlCount, (err, count) => {
        if (err) return res.status(500).json({ err: err.message });
        db.query(sqlSelectWithUser, (err, documents) => {
          if (err) return res.status(500).json({ err: err.message });

          res.send({ data: documents, count: count[0].count });
        });
      });
    } else {
      db.query(sqlCount, (err, count) => {
        if (err) return res.status(500).json({ err: err.message });
        db.query(sqlSelect, (err, documents) => {
          if (err) return res.status(500).json({ err: err.message });

          res.send({ data: documents, count: count[0].count });
        });
      });
    }
  } else if (type !== "0") {
    if (user_id != "undefined") {
      db.query(sqlComCount, (err, count) => {
        if (err) return res.status(500).json({ err: err.message });

        db.query(sqlSelectWithUserCom, (err, documents) => {
          if (err) return res.status(500).json({ err: err.message });
          console.log("comUer", documents);
          res.send({ data: documents, count: count[0].count });
        });
      });
    } else {
      db.query(sqlComCount, (err, count) => {
        if (err) return res.status(500).json({ err: err.message });
        db.query(sqlSelectWithCom, (err, documents) => {
          console.log("com", documents);

          if (err) return res.status(500).json({ err: err.message });
          res.send({ data: documents, count: count[0].count });
        });
      });
    }
  }
};
