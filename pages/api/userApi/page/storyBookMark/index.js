/* eslint-disable import/no-anonymous-default-export */

import auth from "../../../../../component/middleware/middleware";
import db from "../../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await articleBookMark(req, res);
      break;
    case "POST":
      await articleBookMarkDelete(req, res);
      break;
  }
};

const articleBookMark = async (req, res) => {
  const {user_id} = await req.query;
  const {show} = await req.query;
  try {

      const sqlStory = `SELECT s.story_id,title,short_story,body,post_thumbnail,tags,c.community_id,c.community_title,s.created_at,u.user_id,full_name,username,email,total_likes,total_comments, (SELECT COUNT(*)FROM stories_bookmarks JOIN stories s on stories_bookmarks.story_id = s.story_id JOIN users u on s.user_id = u.user_id JOIN communities c on s.community_id = c.community_id JOIN stories_likes_counter slc on s.story_id = slc.story_id JOIN stories_comments_counter scc on s.story_id = scc.story_id WHERE u.status = 1 and stories_bookmarks.user_id = ${user_id}
      ) AS total_bookmarks FROM stories_bookmarks JOIN stories s on stories_bookmarks.story_id = s.story_id JOIN users u on s.user_id = u.user_id JOIN communities c on s.community_id = c.community_id JOIN stories_likes_counter slc on s.story_id = slc.story_id JOIN stories_comments_counter scc on s.story_id = scc.story_id WHERE u.status = 1 and stories_bookmarks.user_id = ${user_id} ORDER BY stories_bookmarks.s_bookmark_id DESC LIMIT 12 OFFSET ${show};`;
      db.query(sqlStory, (err, documents) => {
        if (err)  res.status(500).json({err: err.message});
        res.status(201).json(documents);
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

const articleBookMarkDelete = async (req, res) => {
  const {story_id, user_id} = await req.body;

  try {
    const authData = await auth(req, res);
    if (authData.validated) {
      const sqlStory = `CALL auto_story_bookmarks(${story_id}, ${user_id});`
      db.query(sqlStory, (err, documents) => {
        if (err)  res.status(500).json({err: err.message});
        res.status(201).json({success: true});
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
