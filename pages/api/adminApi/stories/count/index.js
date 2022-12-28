/* eslint-disable import/no-anonymous-default-export */

import auth from "../../../../../component/middleware/middleware";
import db from "../../../../../utils/connectDB";


export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getStoriesCount(req, res);
      break;
  }
};

const getStoriesCount = async (req, res) => {
  const authData = await auth(req, res);
  try {
    if (authData.validated) {
      const sqlActive = `SELECT count(*) as active FROM stories JOIN users u on stories.user_id = u.user_id JOIN communities c on stories.community_id = c.community_id JOIN stories_likes_counter slc on stories.story_id = slc.story_id JOIN stories_comments_counter scc on stories.story_id = scc.story_id`;
      const sqlInActive = `SELECT count(*) as inActive FROM deleted_stories JOIN users u on deleted_stories.user_id = u.user_id JOIN communities c on deleted_stories.community_id = c.community_id JOIN stories_likes_counter slc on deleted_stories.story_id = slc.story_id JOIN stories_comments_counter scc on deleted_stories.story_id = scc.story_id`;
      db.query(sqlActive, (err, active) => {
          if (err) return res.status(500).json({err: err.message});
        db.query(sqlInActive, (err, InActive) => {
            if (err) {
              console.log(err);
            }
            res.status(201).json({...active[0], ...InActive[0]});
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
