/* eslint-disable import/no-anonymous-default-export */

import auth from "../../../../component/middleware/middleware";
import db from "../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getStories(req, res);
      break;
    case "PATCH":
      await banArticle(req, res);
      break;
  }
};

const getStories = async (req, res) => {
  const { order, page, status, community } = req.query;
  const authData = await auth(req, res);
  try {
    if (authData.validated) {
      if (status === "0") {
          const sqlStory = `SELECT deleted_stories.story_id,title,c.community_id,c.community_title,short_story,body,post_thumbnail,tags,deleted_stories.created_at,deleted_at,total_likes,total_comments, u.user_id,full_name,username,email,avatar,total_likes,total_comments, role, status FROM deleted_stories JOIN users u on deleted_stories.user_id = u.user_id JOIN communities c on deleted_stories.community_id = c.community_id JOIN stories_likes_counter slc on deleted_stories.story_id = slc.story_id JOIN stories_comments_counter scc on deleted_stories.story_id = scc.story_id ${community != '0' ? `WHERE c.community_id = ${community}` : ''} ORDER BY deleted_stories.story_id ${order} LIMIT 20 OFFSET ${page}`;
          db.query(sqlStory, (err, story) => {
            if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
              res.status(201).json(story);
            });
        } else if (status === "1"){
          const sqlStory = `SELECT stories.story_id,title,c.community_id,c.community_title,short_story,body,post_thumbnail,tags,stories.created_at,total_likes,total_comments, u.user_id,full_name,username,email,total_likes,total_comments, role, status FROM stories JOIN users u on stories.user_id = u.user_id JOIN communities c on stories.community_id = c.community_id JOIN stories_likes_counter slc on stories.story_id = slc.story_id JOIN stories_comments_counter scc on stories.story_id = scc.story_id ${community != '0' ? `WHERE c.community_id = ${community}` : ''} ORDER BY stories.story_id ${order} LIMIT 20 OFFSET ${page}`;
        db.query(sqlStory, (err, story) => {
        if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
          res.status(201).json(story);
        });
      }
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

