/* eslint-disable import/no-anonymous-default-export */

import auth from "../../../../../component/middleware/middleware";
import db from "../../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await story(req, res);
      break;
  }
};

const story = async (req, res) => {
  const { user_id } = await req.query;
  try {
  
      const sqlStory = `SELECT count(*) as story FROM stories JOIN users u on stories.user_id = u.user_id JOIN stories_likes_counter slc on stories.story_id = slc.story_id JOIN stories_comments_counter scc on slc.story_id = scc.story_id JOIN communities c on stories.community_id = c.community_id WHERE stories.user_id =  ${user_id}`;
      const sqlArticle = `SELECT count(*) as article FROM articles JOIN users u on articles.user_id = u.user_id JOIN communities c on articles.community_id = c.community_id JOIN articles_likes_counter alc on articles.article_id = alc.article_id JOIN articles_comments_counter acc on articles.article_id = acc.article_id WHERE articles.user_id = ${user_id}`;
      const sqlStoryBookMark = `SELECT COUNT(*) as sBook FROM stories_bookmarks JOIN stories s on stories_bookmarks.story_id = s.story_id JOIN users u on s.user_id = u.user_id JOIN communities c on s.community_id = c.community_id JOIN stories_likes_counter slc on s.story_id = slc.story_id JOIN stories_comments_counter scc on s.story_id = scc.story_id WHERE u.status = 1 and stories_bookmarks.user_id = ${user_id}`;
      const sqlArticleBookMark = `SELECT COUNT(*) as aBook FROM articles_bookmarks JOIN articles a on articles_bookmarks.article_id = a.article_id JOIN users u on a.user_id = u.user_id JOIN communities c on a.community_id = c.community_id JOIN articles_likes_counter alc on a.article_id = alc.article_id JOIN articles_comments_counter acc on a.article_id = acc.article_id WHERE u.status = 1 and articles_bookmarks.user_id = ${user_id}`;
      const  sqlFollowing = `SELECT count(*) AS my_followers FROM followers JOIN users u on follower_id = u.user_id WHERE followers.user_id = ${user_id} AND u.status = 1`;
      const sqlfollowers = `SELECT  count(*) AS I_am_following  FROM followers JOIN users u on followers.user_id = u.user_id WHERE followers.follower_id = ${user_id} AND u.status = 1`;
      db.query(sqlStory, (err, story) => {
        if (err) return res.status(500).json({ err: err.message });
        db.query(sqlArticle, (err, article) => {
          if (err) return res.status(500).json({ err: err.message });
          db.query(sqlStoryBookMark, (err, sBook) => {
            if (err) return res.status(500).json({ err: err.message });
            db.query(sqlArticleBookMark, (err, aBook) => {
              if (err) return res.status(500).json({ err: err.message });
              db.query(sqlfollowers, (err, followers) => {
                if (err) return res.status(500).json({ err: err.message });
                db.query(sqlFollowing, (err, following) => {
                  if (err) return res.status(500).json({ err: err.message });
                  res.send({ story, article, sBook, aBook, followers, following });
                });
              });
            });
          });
        });
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
