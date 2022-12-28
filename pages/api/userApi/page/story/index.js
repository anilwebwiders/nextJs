/* eslint-disable import/no-anonymous-default-export */

import auth from "../../../../../component/middleware/middleware";
import db from "../../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await story(req, res);
      break;
    case "DELETE":
      await storyDelete(req, res);
      break;
  }
};

const story = async (req, res) => {
  const {user_id} = await req.query;
  const {show} = await req.query;
  try {
      const sqlStory = `SELECT stories.story_id,title,short_story,body,post_thumbnail,tags,c.community_id,c.community_title,stories.created_at,u.user_id,full_name,username,email,total_likes,total_comments, (SELECT count(*) FROM stories JOIN users u on stories.user_id = u.user_id JOIN stories_likes_counter slc on stories.story_id = slc.story_id JOIN stories_comments_counter scc on slc.story_id = scc.story_id JOIN communities c on stories.community_id = c.community_id WHERE stories.user_id = ${user_id}) AS total_story
      FROM stories JOIN users u on stories.user_id = u.user_id JOIN stories_likes_counter slc on stories.story_id = slc.story_id JOIN stories_comments_counter scc on slc.story_id = scc.story_id JOIN communities c on stories.community_id = c.community_id WHERE stories.user_id = ${user_id} ORDER BY stories.story_id DESC LIMIT 12 OFFSET ${show};`;
      console.log(sqlStory)
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

const storyDelete = async (req, res) => {
  const {story_id} = await req.query;
  try {
    const authData = await auth(req, res);
    if (authData.validated) {
      const sqlStory = `DELETE FROM stories WHERE story_id = ${story_id};`
      db.query(sqlStory, (err, documents) => {
        if (err)  res.status(500).json({err: err.message});
        res.status(201).json({success: 'Deleted Successfully'});
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
