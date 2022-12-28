/* eslint-disable import/no-anonymous-default-export */

import auth from "../../../../../component/middleware/middleware";
import db from "../../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getReportCount(req, res);
      break;
  }
};

const getReportCount = async (req, res) => {
  const authData = await auth(req, res);
  try {
    if (authData.validated) {
      const sqlStory = `SELECT count(*) as count FROM reports JOIN stories s on reports.story_id = s.story_id JOIN users u on from_user_id = u.user_id JOIN users u2 on s.user_id = u2.user_id WHERE report_type = 'story_report' AND is_resolved = 0;`;
      const sqlSComment = `SELECT count(*) as count FROM reports JOIN stories_comments sc on reported_story_comment_id = sc.story_comment_id JOIN stories s on sc.story_id = s.story_id JOIN users u on from_user_id = u.user_id JOIN users u2 on sc.user_id = u2.user_id WHERE report_type = 'story_comment_report' AND is_resolved = 0;`;
      const sqlSCommentReply = `SELECT count(*) as count FROM reports JOIN story_comments_reply c on reported_story_comment_reply_id = c.sc_reply_id JOIN stories s on c.story_id = s.story_id JOIN users u on from_user_id = u.user_id JOIN users u2 on c.user_id = u2.user_id WHERE report_type = 'story_comment_reply_report' AND is_resolved = 0;`;
      const sqlArticle = `SELECT count(*) as count FROM reports JOIN articles a on reports.article_id = a.article_id JOIN users u on from_user_id = u.user_id JOIN users u2 on a.user_id = u2.user_id WHERE report_type = 'article_report' AND is_resolved = 0`;
      const sqlAComment = `SELECT  count(*) as count FROM reports JOIN articles_comments ac on reported_article_comment_id = ac.article_comment_id JOIN articles a on ac.article_id = a.article_id JOIN users u on from_user_id = u.user_id JOIN users u2 on ac.user_id = u2.user_id WHERE report_type = 'article_comment_report' AND is_resolved = 0 ;`;
      const sqlACommentReply = `SELECT COUNT(*) as count FROM reports JOIN articles_comments_reply ac on reported_article_comment_reply_id = ac.ac_reply_id JOIN articles a on ac.article_id = a.article_id JOIN users u on from_user_id = u.user_id JOIN users u2 on ac.user_id = u2.user_id WHERE report_type = 'article_comment_reply_report' AND is_resolved = 0;`;
      db.query(sqlStory, (err, story) => {
      if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
        db.query(sqlSComment, (err, sComment) => {
        if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
          db.query(sqlSCommentReply, (err, sCommentR) => {
          if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
            db.query(sqlArticle, (err, article) => {
            if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
              db.query(sqlAComment, (err, aComment) => {
              if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
                db.query(sqlACommentReply, (err, aCommentR) => {
                if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
                  res
                    .status(201)
                    .json({
                      story: story[0].count,
                      sComment: sComment[0].count,
                      sCommentR: sCommentR[0].count,
                      article: article[0].count,
                      aComment: aComment[0].count,
                      aCommentR: aCommentR[0].count,
                    });
                });
              });
            });
          });
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
