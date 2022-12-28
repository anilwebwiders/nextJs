/* eslint-disable import/no-anonymous-default-export */

import auth from "../../../../../component/middleware/middleware";
import db from "../../../../../utils/connectDB";
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await notificationEmail(req, res);
      break;
    case "PATCH":
      await notificationEmailPatch(req, res);
      break;
  }
};

const notificationEmail = async (req, res) => {
  const { user_id } = await req.query;

  try {
    const sqlMain = `SELECT main_story_likes,
    main_story_comments,
    main_story_post,
    main_article_likes,
    main_article_comments,
    main_article_post,
    main_followers,
    main_following,
    main_subscription FROM notification_settings WHERE user_id = ${user_id}`;
    const sqlEmail = `SELECT story_likes,
    story_comments,
    story_post,
    article_likes,
    article_comments,
    article_post,
    followers,
    following,
    subscription FROM email_notification_settings WHERE user_id = ${user_id}`;
    const authdata = await auth(req, res);
    if (authdata.validated) {
      db.query(sqlMain, (err, main) => {
      if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
        db.query(sqlEmail, (err, email) => {
        if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
          res.status(201).json({ main, email });
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

const notificationEmailPatch = async (req, res) => {
  const {
    story_likes,
    story_comments,
    story_post,
    article_likes,
    article_comments,
    article_post,
    followers,
    following,
    subscription,
    user_id,
    main_story_likes,
    main_story_comments,
    main_story_post,
    main_article_likes,
    main_article_comments,
    main_article_post,
    main_followers,
    main_following,
    main_subscription,
  } = await req.body;

  const sqlEmailPatch = `UPDATE fnmotivation.email_notification_settings t SET
    t.story_likes = ${story_likes},
    t.story_comments = ${story_comments},
    t.story_post = ${story_post},
    t.article_likes = ${article_likes},
    t.article_comments = ${article_comments},
    t.article_post = ${article_post},
    t.followers = ${followers},
    t.following = ${following},
    t.subscription =${subscription}  WHERE t.user_id = ${user_id}`;

  const sqlPatch = `UPDATE fnmotivation.notification_settings t SET
    t.main_story_likes = ${main_story_likes},
    t.main_story_comments = ${main_story_comments},
    t.main_story_post = ${main_story_post},
    t.main_article_likes = ${main_article_likes},
    t.main_article_comments = ${main_article_comments},
    t.main_article_post = ${main_article_post},
    t.main_followers = ${main_followers},
    t.main_following = ${main_following},
    t.main_subscription =${main_subscription}  WHERE t.user_id = ${user_id}`;
  const authdata = await auth(req, res);
  if (authdata.validated) {
    db.query(sqlEmailPatch, (err, documents) => {
      console.log(err);
      if (err) return res.status(500).json({ err: err.message });
      db.query(sqlPatch, (err, documents) => {
        console.log(err);
        if (err) return res.status(500).json({ err: err.message });
        res.send({ success: "Updated Successfully" });
      });
    });
  }
};
