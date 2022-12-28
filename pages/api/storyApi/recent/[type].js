/* eslint-disable import/no-anonymous-default-export */
import db from "../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await recent(req, res);
      break;
  }
};

const recent = async (req, res) => {
  let show = await req.query.page;
  const type = await req.query.type;
  const user_id = await req.query.user_id;
  console.log(user_id, type);

  const sqlSelect = `SELECT stories.story_id,title,c.community_id,c.community_title,short_story,body,post_thumbnail,tags,stories.created_at,u.user_id,full_name,username,email,total_likes,total_comments, (SELECT COUNT(*) FROM stories JOIN users u2 on stories.user_id = u2.user_id JOIN stories_likes_counter slc on stories.story_id = slc.story_id JOIN stories_comments_counter scc on stories.story_id = scc.story_id WHERE u2.status = 1) as total_stories FROM stories JOIN users u on stories.user_id = u.user_id JOIN communities c on stories.community_id = c.community_id JOIN stories_likes_counter slc on stories.story_id = slc.story_id JOIN stories_comments_counter scc on stories.story_id = scc.story_id WHERE u.status = 1  ORDER BY stories.story_id DESC LIMIT 12 OFFSET ${show};`;
  const count = `SELECT COUNT(*) as count FROM stories JOIN users u2 on stories.user_id = u2.user_id WHERE u2.status = 1;`;
  const sqlSelectWithCom = `SELECT stories.story_id,title,c.community_id,c.community_title,short_story,body,post_thumbnail,tags,stories.created_at,
  u.user_id,full_name,username,email,total_likes,total_comments, (SELECT COUNT(*) FROM stories JOIN users u2 on stories.user_id = u2.user_id 
  JOIN stories_likes_counter slc on stories.story_id = slc.story_id JOIN stories_comments_counter scc on stories.story_id = scc.story_id 
  JOIN communities c2 on stories.community_id = c2.community_id WHERE u2.status = 1 AND c2.community_id = ${type}) 
  as total_stories FROM stories JOIN users u on stories.user_id = u.user_id JOIN communities c on stories.community_id = c.community_id 
  JOIN stories_likes_counter slc on stories.story_id = slc.story_id JOIN stories_comments_counter scc on stories.story_id = scc.story_id WHERE u.status = 1 
  AND c.community_id = ${type}  ORDER BY stories.story_id DESC LIMIT 12 OFFSET ${show};`;
  const comCount = `SELECT COUNT(*) as count FROM stories JOIN users u2 on stories.user_id = u2.user_id JOIN communities c2 on stories.community_id = c2.community_id WHERE u2.status = 1 AND  c2.community_id = ${type} ;`;

  const sqlSelectWithUserCom = `SELECT stories.story_id,title,c.community_id,c.community_title,short_story,body,post_thumbnail,tags,stories.created_at,
  u.user_id,full_name,avatar,username,avatar,email,total_likes,total_comments, 
  (SELECT count(*) FROM stories_likes WHERE stories_likes.story_id = stories.story_id AND stories_likes.user_id =${user_id}) 
  AS liked,(SELECT count(*) FROM stories_bookmarks WHERE stories_bookmarks.story_id = stories.story_id 
  AND stories_bookmarks.user_id =${user_id}) AS bookmarked,(SELECT count(*) FROM followers 
  WHERE followers.user_id = u.user_id AND followers.follower_id =${user_id}) 
  AS followed FROM stories JOIN users u on stories.user_id = u.user_id JOIN communities c on stories.community_id = c.community_id 
  JOIN stories_likes_counter slc on stories.story_id = slc.story_id JOIN stories_comments_counter scc on stories.story_id = scc.story_id WHERE u.status = 1 
  AND c.community_id = ${type}
  ORDER BY stories.story_id DESC LIMIT 12 OFFSET ${show};`;

  const sqlSelectWithUser = `SELECT stories.story_id,title,c.community_id,c.community_title,short_story,body,post_thumbnail,tags,stories.created_at,
  u.user_id,full_name,username,email,avatar,total_likes,total_comments, 
  (SELECT count(*) FROM stories_likes WHERE stories_likes.story_id = stories.story_id AND stories_likes.user_id =${user_id}) AS liked,
  (SELECT count(*) FROM stories_bookmarks WHERE stories_bookmarks.story_id = stories.story_id AND stories_bookmarks.user_id =${user_id}) 
  AS bookmarked,(SELECT count(*) FROM followers WHERE followers.user_id = u.user_id AND followers.follower_id =${user_id}) AS followed 
  FROM stories JOIN users u on stories.user_id = u.user_id 
  JOIN communities c on stories.community_id = c.community_id JOIN stories_likes_counter slc on stories.story_id = slc.story_id 
  JOIN stories_comments_counter scc on stories.story_id = scc.story_id WHERE u.status = 1  
  ORDER BY stories.story_id DESC  LIMIT 12 OFFSET ${show};`;

  if (type === "0") {
    if (user_id != "undefined") {
      db.query(count, (err, count) => {
        if (err) return res.status(500).json({ err: err.message });
        db.query(sqlSelectWithUser, (err, documents) => {
          if (err) return res.status(500).json({ err: err.message });

          res.send({ data: documents, count: count[0].count });
        });
      });
    } else {
      db.query(count, (err, count) => {
        if (err) return res.status(500).json({ err: err.message });
        db.query(sqlSelect, (err, documents) => {
          if (err) return res.status(500).json({ err: err.message });

          res.send({ data: documents, count: count[0].count });
        });
      });
    }
  } else if (type !== "0") {
    if (user_id != "undefined") {
      db.query(comCount, (err, count) => {
        if (err) return res.status(500).json({ err: err.message });

        db.query(sqlSelectWithUserCom, (err, documents) => {
          if (err) return res.status(500).json({ err: err.message });

          res.send({ data: documents, count: count[0].count });
        });
      });
    } else {
      db.query(comCount, (err, count) => {
        if (err) return res.status(500).json({ err: err.message });

        db.query(sqlSelectWithCom, (err, documents) => {
          if (err) return res.status(500).json({ err: err.message });
          res.send({ data: documents, count: count[0].count });
        });
      });
    }
  }
};
