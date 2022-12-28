/* eslint-disable import/no-anonymous-default-export */

import auth from "../../../../component/middleware/middleware";
import db from "../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getComments(req, res);
      break;
  }
};

const getComments = async (req, res) => {
  const { user_id, show } = req.query;
  try {
    // const authData = await auth(req, res);
    // if (authData.validated) {
    const sqlStoryCount = `SELECT COUNT(*) as count
        FROM stories JOIN stories_comments sc on stories.story_id = sc.story_id JOIN communities c on stories.community_id = c.community_id JOIN users u ON sc.user_id = u.user_id WHERE stories.user_id = ${user_id} AND u.status = 1`;
    const sqlStory = `SELECT stories.story_id,title,story_comment_id,message,sc.created_at as comment_created,community_title,u.user_id,full_name,username,email,avatar
        FROM stories JOIN stories_comments sc on stories.story_id = sc.story_id JOIN communities c on stories.community_id = c.community_id JOIN users u ON sc.user_id = u.user_id WHERE stories.user_id = ${user_id} AND u.status = 1 ORDER BY story_comment_id DESC LIMIT 10 OFFSET ${show}`;
    const sqArticleCount = `SELECT count(*) as count
        FROM articles JOIN articles_comments ac on articles.article_id = ac.article_id JOIN communities c on articles.community_id = c.community_id JOIN users u on ac.user_id = u.user_id WHERE articles.user_id = ${user_id} AND u.status = 1`;
    const sqArticle = `SELECT articles.article_id,title,article_comment_id,message,ac.created_at as comment_created,community_title,u.user_id,full_name,username,email,avatar
        FROM articles JOIN articles_comments ac on articles.article_id = ac.article_id JOIN communities c on articles.community_id = c.community_id JOIN users u on ac.user_id = u.user_id WHERE articles.user_id = ${user_id} AND u.status = 1 ORDER BY article_comment_id DESC LIMIT 10 OFFSET ${show}`;

    db.query(sqlStoryCount, (err, sCount) => {
      if (err) return res.status(500).json({ err: err.message });
      db.query(sqArticleCount, (err, aCount) => {
        if (err) return res.status(500).json({ err: err.message });
        db.query(sqlStory, (err, story) => {
          if (err) return res.status(500).json({ err: err.message });
          db.query(sqArticle, (err, article) => {
            if (err) return res.status(500).json({ err: err.message });
            console.log({
              sCount: sCount[0].count,
              story: story,
              aCount: aCount[0].count,
              article: article,
            });
            res
              .status(201)
              .json({
                sCount: sCount[0].count,
                story: story,
                aCount: aCount[0].count,
                article: article,
              });
          });
        });
      });
    });
    // }
  } catch (err) {
    return  res.status(500).json({
              success: false,
              message: ["Server Error"],
              error_code: 1000,
              data: {},
            });
  }
};
