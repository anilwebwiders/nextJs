/* eslint-disable import/no-anonymous-default-export */
import db from "../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await popular(req, res);
      break;
  }
};

const popular = async (req, res) => {
  const show = await req.query.page;
  const type = await req.query.type;
  const user_id = await req.query.user_id;

  const count = `SELECT COUNT(*) as count FROM stories JOIN users u2 on stories.user_id = u2.user_id WHERE u2.status = 1;`;
  const sqlSelect = `SELECT stories.story_id,title,c.community_id,c.community_title,short_story,body,post_thumbnail,tags,stories.created_at,u.user_id,full_name,username,email,total_likes,total_comments, (SELECT COUNT(*) FROM stories JOIN users u2 on stories.user_id = u2.user_id WHERE u2.status = 1) as total_stories FROM stories JOIN users u on stories.user_id = u.user_id JOIN communities c on stories.community_id = c.community_id JOIN stories_likes_counter slc on stories.story_id = slc.story_id JOIN stories_comments_counter scc on stories.story_id = scc.story_id WHERE u.status = 1 ORDER BY (total_likes+total_likes) DESC LIMIT 12 OFFSET ${show};`;

  const comCount = `SELECT COUNT(*) as count FROM stories JOIN users u2 on stories.user_id = u2.user_id JOIN communities c2 on stories.community_id = c2.community_id WHERE u2.status = 1 AND  c2.community_id = ${type}`;
  const sqlSelectWithCom = `SELECT stories.story_id,title,c.community_id,c.community_title,short_story,body,post_thumbnail,tags,stories.created_at,u.user_id,full_name,username,email,total_likes,total_comments, (SELECT COUNT(*) FROM stories JOIN users u2 on stories.user_id = u2.user_id JOIN communities c2 on stories.community_id = c2.community_id WHERE u2.status = 1 AND  c2.community_id = ${type} ) as total_stories FROM stories JOIN users u on stories.user_id = u.user_id JOIN communities c on stories.community_id = c.community_id JOIN stories_likes_counter slc on stories.story_id = slc.story_id JOIN stories_comments_counter scc on stories.story_id = scc.story_id WHERE u.status = 1 AND c.community_id = ${type} ORDER BY (total_likes+total_likes) DESC LIMIT 12 OFFSET ${show};`;

  const count24 = `SELECT COUNT(*) as count FROM stories JOIN users u2 on stories.user_id = u2.user_id JOIN stories_likes_counter slc on stories.story_id = slc.story_id JOIN stories_comments_counter scc on stories.story_id = scc.story_id WHERE u2.status = 1 AND (scc.updated_at > now() - interval 24 hour OR slc.updated_at > now() - interval 24 hour);`;
  const sqlSelect24 = `SELECT stories.story_id,title,c.community_id,c.community_title,short_story,body,post_thumbnail,tags,stories.created_at,u.user_id,full_name,username,email,total_likes,total_comments, (SELECT COUNT(*) FROM stories JOIN users u2 on stories.user_id = u2.user_id WHERE u2.status = 1) as total_stories FROM stories JOIN users u on stories.user_id = u.user_id JOIN communities c on stories.community_id = c.community_id JOIN stories_likes_counter slc on stories.story_id = slc.story_id JOIN stories_comments_counter scc on stories.story_id = scc.story_id WHERE u.status = 1 ORDER BY (total_likes+total_likes) DESC LIMIT 12 OFFSET ${show};`;

  const countCom24 = `SELECT COUNT(*) as count FROM stories JOIN users u2 on stories.user_id = u2.user_id JOIN stories_likes_counter slc on stories.story_id = slc.story_id JOIN stories_comments_counter scc on stories.story_id = scc.story_id JOIN communities c2 on stories.community_id = c2.community_id WHERE u2.status = 1 AND (scc.updated_at > now() - interval 24 hour OR slc.updated_at > now() - interval 24 hour) AND c2.community_id = ${type};`;
  const sqlSelectWithCom24 = `SELECT stories.story_id,title,c.community_id,c.community_title,short_story,body,post_thumbnail,tags,stories.created_at,u.user_id,full_name,username,email,total_likes,total_comments, (SELECT COUNT(*) FROM stories JOIN users u2 on stories.user_id = u2.user_id JOIN communities c2 on stories.community_id = c2.community_id WHERE u2.status = 1 AND  c2.community_id = ${type} ) as total_stories FROM stories JOIN users u on stories.user_id = u.user_id JOIN communities c on stories.community_id = c.community_id JOIN stories_likes_counter slc on stories.story_id = slc.story_id JOIN stories_comments_counter scc on stories.story_id = scc.story_id WHERE u.status = 1 AND c.community_id = ${type} ORDER BY (total_likes+total_likes) DESC LIMIT 12 OFFSET ${show};`;

  const sqlSelectWithwithUser = `SELECT stories.story_id,title,c.community_id,c.community_title,short_story,body,post_thumbnail,tags,stories.created_at,
  u.user_id,full_name,username,email,total_likes,total_comments, total_likes,total_comments, 
  (SELECT count(*) FROM stories_likes WHERE stories_likes.story_id = stories.story_id AND stories_likes.user_id =${user_id}) 
  AS liked,(SELECT count(*) FROM stories_bookmarks WHERE stories_bookmarks.story_id = stories.story_id AND stories_bookmarks.user_id =${user_id}) 
  AS bookmarked,(SELECT count(*) FROM followers WHERE followers.user_id = u.user_id AND followers.follower_id =${user_id}) AS followed 
  FROM stories JOIN users u on stories.user_id = u.user_id JOIN communities c on stories.community_id = c.community_id
   JOIN stories_likes_counter slc on stories.story_id = slc.story_id JOIN stories_comments_counter scc on stories.story_id = scc.story_id WHERE u.status = 1 
  ORDER BY (total_likes+total_likes) DESC LIMIT 12 OFFSET ${show};`;

  const sqlSelectWithwithComUser = `SELECT stories.story_id,title,c.community_id,c.community_title,short_story,body,post_thumbnail,tags,stories.created_at,
  u.user_id,full_name,username,email,total_likes,total_comments, total_likes,total_comments, 
  (SELECT count(*) FROM stories_likes WHERE stories_likes.story_id = stories.story_id AND stories_likes.user_id =${user_id}) 
  AS liked,(SELECT count(*) FROM stories_bookmarks WHERE stories_bookmarks.story_id = stories.story_id AND stories_bookmarks.user_id =${user_id}) 
  AS bookmarked,(SELECT count(*) FROM followers WHERE followers.user_id = u.user_id AND followers.follower_id =${user_id}) AS followed FROM stories 
  JOIN users u on stories.user_id = u.user_id JOIN communities c on stories.community_id = c.community_id JOIN stories_likes_counter slc on stories.story_id = slc.story_id 
  JOIN stories_comments_counter scc on stories.story_id = scc.story_id WHERE u.status = 1 AND c.community_id =  ${type} 
  ORDER BY (total_likes+total_likes) DESC LIMIT 12 OFFSET ${show};`;

  const sqlSelectWithCom24withUser = `SELECT stories.story_id,title,c.community_id,c.community_title,short_story,body,post_thumbnail,tags,stories.created_at,
  u.user_id,full_name,username,email,total_likes,total_comments, 
  (SELECT count(*) FROM stories_likes WHERE stories_likes.story_id = stories.story_id AND stories_likes.user_id =${user_id}) 
  AS liked,(SELECT count(*) FROM stories_bookmarks WHERE stories_bookmarks.story_id = stories.story_id AND stories_bookmarks.user_id =${user_id}) 
  AS bookmarked,(SELECT count(*) FROM followers WHERE followers.user_id = u.user_id AND followers.follower_id =${user_id}) AS followed FROM stories 
  JOIN users u on stories.user_id = u.user_id 
  JOIN communities c on stories.community_id = c.community_id JOIN stories_likes_counter slc on stories.story_id = slc.story_id 
  JOIN stories_comments_counter scc on stories.story_id = scc.story_id WHERE u.status = 1 AND (scc.updated_at > now() - interval 24 hour OR slc.updated_at > now() - interval 24 hour) 
  AND c.community_id = ${type} 
  ORDER BY (total_likes+total_likes) DESC  LIMIT 12 OFFSET ${show};`;

  const sqlSelect24withUser = `SELECT stories.story_id,title,c.community_id,c.community_title,short_story,body,post_thumbnail,tags,stories.created_at,
  u.user_id,full_name,username,email,total_likes,total_comments, total_likes,total_comments, 
  (SELECT count(*) FROM stories_likes WHERE stories_likes.story_id = stories.story_id AND stories_likes.user_id = ${user_id}) AS liked,
  (SELECT count(*) FROM stories_bookmarks WHERE stories_bookmarks.story_id = stories.story_id AND stories_bookmarks.user_id = ${user_id}) 
  AS bookmarked,(SELECT count(*) FROM followers WHERE followers.user_id = u.user_id AND followers.follower_id = ${user_id}) AS followed 
  FROM stories JOIN users u on stories.user_id = u.user_id 
  JOIN communities c on stories.community_id = c.community_id JOIN stories_likes_counter slc on stories.story_id = slc.story_id 
  JOIN stories_comments_counter scc on stories.story_id = scc.story_id WHERE u.status = 1 ORDER BY (total_likes+total_likes) DESC LIMIT 12 OFFSET ${show};`;

  if (type == "0") {
    if (user_id != "undefined") {
      db.query(count24, (err, count24) => {
        console.log(err);
        if (err)
          return res.status(500).json({
            success: false,
            message: ["Database Error"],
            error_code: 1106,
          });
        db.query(sqlSelect24withUser, (err, doc24) => {
          console.log(err);
          if (err)
            return res.status(500).json({
              success: false,
              message: ["Database Error"],
              error_code: 1106,
            });
          if (doc24 && doc24.length == 0) {
            db.query(count, (err, count) => {
              console.log(err);
              if (err)
                return res.status(500).json({
                  success: false,
                  message: ["Database Error"],
                  error_code: 1106,
                });
              db.query(sqlSelectWithwithUser, (err, documents) => {
                console.log(err);
                if (err)
                  return res.status(500).json({
                    success: false,
                    message: ["Database Error"],
                    error_code: 1106,
                  });
                res.send({ data: documents, count: count[0].count });
              });
            });
          } else {
            res.send({ data: doc24, count: count24[0].count });
          }
        });
      });
    } else {
      db.query(count24, (err, count24) => {
        console.log(err);
        if (err)
          return res.status(500).json({
            success: false,
            message: ["Database Error"],
            error_code: 1106,
          });
        db.query(sqlSelect24, (err, doc24) => {
          console.log(err);
          if (err)
            return res.status(500).json({
              success: false,
              message: ["Database Error"],
              error_code: 1106,
            });
          if (doc24 && doc24.length == 0) {
            db.query(count, (err, count) => {
              console.log(err);
              if (err)
                return res.status(500).json({
                  success: false,
                  message: ["Database Error"],
                  error_code: 1106,
                });
              db.query(sqlSelect, (err, documents) => {
                console.log(err);
                if (err)
                  return res.status(500).json({
                    success: false,
                    message: ["Database Error"],
                    error_code: 1106,
                  });
                res.send({ data: documents, count: count[0].count });
              });
            });
          } else {
            res.send({ data: doc24, count: count24[0].count });
          }
        });
      });
    }
  } else if (type != "0") {
    if (user_id != "undefined") {
      db.query(countCom24, (err, count24) => {
        console.log(err);
        if (err)
          return res.status(500).json({
            success: false,
            message: ["Database Error"],
            error_code: 1106,
          });
        db.query(sqlSelectWithCom24withUser, (err, doc24) => {
          console.log(err);
          if (err)
            return res.status(500).json({
              success: false,
              message: ["Database Error"],
              error_code: 1106,
            });
          if (doc24 && doc24.length == 0) {
            db.query(comCount, (err, count) => {
              console.log(err);
              if (err)
                return res.status(500).json({
                  success: false,
                  message: ["Database Error"],
                  error_code: 1106,
                });
              db.query(sqlSelectWithwithComUser, (err, documents) => {
                console.log(err);
                if (err)
                  return res.status(500).json({
                    success: false,
                    message: ["Database Error"],
                    error_code: 1106,
                  });
                res.send({ data: documents, count: count[0].count });
              });
            });
          } else {
            res.send({ data: doc24, count: count24[0].count });
          }
        });
      });
    } else {
      db.query(countCom24, (err, count24) => {
        console.log(err);
        if (err)
          return res.status(500).json({
            success: false,
            message: ["Database Error"],
            error_code: 1106,
          });
        db.query(sqlSelectWithCom24, (err, doc24) => {
          console.log(err);
          if (err)
            return res.status(500).json({
              success: false,
              message: ["Database Error"],
              error_code: 1106,
            });
          if (doc24 && doc24.length == 0) {
            db.query(comCount, (err, count) => {
              console.log(err);
              if (err)
                return res.status(500).json({
                  success: false,
                  message: ["Database Error"],
                  error_code: 1106,
                });
              db.query(sqlSelectWithCom, (err, documents) => {
                console.log(err);
                if (err)
                  return res.status(500).json({
                    success: false,
                    message: ["Database Error"],
                    error_code: 1106,
                  });
                res.send({ data: documents, count: count[0].count });
              });
            });
          } else {
            res.send({ data: doc24, count: count24[0].count });
          }
        });
      });
    }
  }
};
