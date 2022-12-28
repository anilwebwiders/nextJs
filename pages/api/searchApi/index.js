/* eslint-disable import/no-anonymous-default-export */
import db from "../../../utils/connectDB";
import { changeText } from "../../../utils/replace";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await search(req, res);
      break;
  }
};

const search = async (req, res) => {
  let { show, search, type, user_id } = await req.query;
  search = changeText(search);
  let userSearch = `(username LIKE '%${search}%' OR full_name LIKE '%${search}%') AND`;

  const sqlStoryCount = `SELECT count(*) as count FROM stories JOIN users u on stories.user_id = u.user_id JOIN communities c on stories.community_id = c.community_id WHERE u.status = 1 AND  (short_story LIKE  ('%${search}y%') OR body LIKE ('%${search}%') OR title LIKE ('%${search}%'))`;
  const sqlStorySearch = `SELECT stories.story_id,title,short_story,body,post_thumbnail,tags,c.community_id,c.community_title,stories.created_at,total_likes,total_comments,u.user_id,full_name,username,email FROM stories JOIN users u on stories.user_id = u.user_id JOIN communities c on stories.community_id = c.community_id JOIN stories_likes_counter slc on stories.story_id = slc.story_id JOIN stories_comments_counter scc on stories.story_id = scc.story_id WHERE u.status = 1 AND  (short_story LIKE  ('%${search}%') OR body LIKE ('%${search}%') OR title LIKE ('%${search}%')) ORDER BY stories.story_id DESC LIMIT 12 OFFSET ${show};`;
  const sqlStorySearchWithUser = `SELECT stories.story_id,title,short_story,body,post_thumbnail,tags,c.community_id,c.community_title,stories.created_at,total_likes,total_comments,
  u.user_id,u.avatar,full_name,username,email,
  (SELECT count(*) FROM stories_likes WHERE stories_likes.story_id = stories.story_id AND stories_likes.user_id =${user_id}) AS liked,(SELECT count(*) 
  FROM stories_bookmarks WHERE stories_bookmarks.story_id = stories.story_id AND stories_bookmarks.user_id =${user_id}) AS bookmarked,
  (SELECT count(*) FROM followers WHERE followers.user_id = u.user_id AND followers.follower_id =${user_id}) 
  AS followed FROM stories JOIN users u on stories.user_id = u.user_id JOIN communities c on stories.community_id = c.community_id 
  JOIN stories_likes_counter slc on stories.story_id = slc.story_id JOIN stories_comments_counter scc on stories.story_id = scc.story_id WHERE u.status = 1 
  AND  (short_story LIKE   ('%${search}y%')  OR body LIKE  ('%${search}y%')  OR title LIKE  ('%${search}y%')) ORDER BY stories.story_id DESC LIMIT 12 OFFSET ${show};`;

  const sqlUserCount = `SELECT count(*) as count FROM users WHERE ${
    search ? userSearch : ""
  }  status = 1 and user_id != 37;`;
  const sqlUserSearch = `SELECT user_id,full_name,username,email,avatar FROM users WHERE ${
    search ? userSearch : ""
  }  status = 1 and user_id != 37 ORDER BY user_id DESC LIMIT 12 OFFSET ${show};`;
  const sqlArticleCount = `SELECT count(*) as count
  FROM articles JOIN users u on articles.user_id = u.user_id JOIN communities c on articles.community_id = c.community_id JOIN articles_likes_counter alc on articles.article_id = alc.article_id JOIN articles_comments_counter acc on articles.article_id = acc.article_id WHERE u.status = 1 AND (articles.title LIKE  ('%${search}%') OR articles.source_text LIKE ('%${search}%') OR articles.description LIKE ('%${search}%') )`;
  const sqlArticleSearch = `SELECT articles.article_id,title,redirect_link,source_text,img_link,description,c.community_id,c.community_title,articles.created_at,u.user_id,full_name,username,email,total_likes,total_comments FROM articles JOIN users u on articles.user_id = u.user_id JOIN communities c on articles.community_id = c.community_id JOIN articles_likes_counter alc on articles.article_id = alc.article_id JOIN articles_comments_counter acc on articles.article_id = acc.article_id WHERE u.status = 1 AND (articles.title LIKE  ('%${search}%') OR articles.source_text LIKE ('%${search}%') OR articles.community_id LIKE ('%${search}%') ) ORDER BY articles.article_id  DESC LIMIT 12 OFFSET ${show};`;
  const sqlArticleSearchWithUser = `SELECT articles.article_id,title,redirect_link,source_text,img_link,description,c.community_id,c.community_title,articles.created_at,u.user_id,full_name,username,email,total_likes,total_comments,(SELECT count(*) FROM articles_likes WHERE articles_likes.article_id = articles.article_id AND articles_likes.user_id =${user_id}) AS liked,(SELECT count(*) FROM articles_bookmarks WHERE articles_bookmarks.article_id = articles.article_id AND articles_bookmarks.user_id =${user_id}) AS bookmarked,(SELECT count(*) FROM followers WHERE followers.user_id = u.user_id AND followers.follower_id =${user_id}) AS followed
  FROM articles JOIN users u on articles.user_id = u.user_id JOIN communities c on articles.community_id = c.community_id JOIN articles_likes_counter alc on articles.article_id = alc.article_id JOIN articles_comments_counter acc on articles.article_id = acc.article_id WHERE u.status = 1 AND (articles.title LIKE  ('%${search}%') OR articles.source_text LIKE ('%${search}%') OR articles.community_id LIKE ('%${search}%') )  ORDER BY articles.article_id DESC  LIMIT 12 OFFSET ${show};`;

  db.query(
    (type === "story" && sqlStoryCount) ||
      (type === "user" && sqlUserCount) ||
      (type === "article" && sqlArticleCount),
    (err, count) => {
      if (err) {
        console.log(err);
      }

      if (type === "story") {
        if (user_id != "undefined") {
          console.log('get')
          db.query(sqlStorySearchWithUser, (err, documents) => {
            if (err) return res.status(500).json({ err: err.message });
            res.send({ data: documents, count: count });
          });
        } else {
          db.query(sqlStorySearch, (err, documents) => {
            if (err) return res.status(500).json({ err: err.message });
            res.send({ data: documents, count: count });
          });
        }
      }
      if (type === "article") {
        if (user_id != "undefined") {
          db.query(sqlArticleSearchWithUser, (err, documents) => {
            if (err) return res.status(500).json({ err: err.message });
            res.send({ data: documents, count: count });
          });
        } else {
          db.query(sqlArticleSearch, (err, documents) => {
            if (err) return res.status(500).json({ err: err.message });
            res.send({ data: documents, count: count });
          });
        }
      }
      if (type === "user") {
        db.query(sqlUserSearch, (err, documents) => {
          if (err) return res.status(500).json({ err: err.message });
          res.send({ data: documents, count: count });
        });
      }
    }
  );
};
