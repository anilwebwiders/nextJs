/* eslint-disable import/no-anonymous-default-export */
import db from "../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getStoryDetails(req, res);
      break;
  }
};

const getStoryDetails = async (req, res) => {
  const { story_id, user_id } = await req.query;
  // console.log(story_id, typeof user_id);
  const sqlSelect = `SELECT stories.story_id,title,c.community_id,c.community_title,short_story,body,post_thumbnail,tags,stories.created_at,
  u.user_id,avatar,full_name,username,avatar,email,total_likes,total_comments FROM stories JOIN users u on stories.user_id = u.user_id 
  JOIN communities c on stories.community_id = c.community_id 
  JOIN stories_likes_counter slc on stories.story_id = slc.story_id JOIN stories_comments_counter scc on stories.story_id = scc.story_id WHERE u.status = 1  
  AND stories.story_id =  ${story_id};`;

  const sqlSelectWithUser = `SELECT stories.story_id,title,c.community_id,c.community_title,short_story,body,post_thumbnail,tags,stories.created_at,
  u.user_id,full_name,avatar,username,email,total_likes,total_comments,
  (SELECT count(*) FROM stories_likes WHERE stories_likes.story_id = stories.story_id AND stories_likes.user_id =${user_id}) 
  AS liked,(SELECT count(*) FROM stories_bookmarks WHERE stories_bookmarks.story_id = stories.story_id AND stories_bookmarks.user_id =${user_id}) 
  AS bookmarked,(SELECT count(*) FROM followers WHERE followers.user_id = u.user_id AND followers.follower_id =${user_id}) AS followed 
  FROM stories JOIN users u on stories.user_id = u.user_id JOIN communities c on stories.community_id = c.community_id 
  JOIN stories_likes_counter slc on stories.story_id = slc.story_id JOIN stories_comments_counter scc on stories.story_id = scc.story_id WHERE u.status = 1  
  AND stories.story_id = ${story_id};`;
  const sqlFiles = `SELECT story_content_id, story_id, content_type,content_link FROM story_contents WHERE story_id = ${story_id};`;

  if (user_id != "undefined") {
    db.query(sqlFiles, (err, files) => {
      if (err) return res.status(500).json({ err: err.message });
      db.query(sqlSelectWithUser, (err, documents) => {
        if (err) return res.status(500).json({ err: err.message });
        // console.log(documents[0])
        return res.status(201).json({
          success: true,
          message: "",
          data: { ...documents[0], files },
        });
      });
    });
  } else {
    db.query(sqlFiles, (err, files) => {
      db.query(sqlSelect, (err, documents) => {
        if (err) return res.status(500).json({ err: err.message });
        return res.status(201).json({
          success: true,
          message: "",
          data: {...documents[0], files},
        });
      });
    });
  }
};
