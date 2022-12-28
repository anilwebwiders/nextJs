/* eslint-disable import/no-anonymous-default-export */
import db from "../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await subcribedStory(req, res);
      break;
  }
};

const subcribedStory = async (req, res) => {
  let { page, type, user_id } = await req.query;

  console.log(page, type, user_id);

  const sqlComCount = `SELECT count(*) as count FROM community_subscriptions JOIN stories s on community_subscriptions.community_id = s.community_id JOIN communities c on s.community_id = c.community_id JOIN users u on s.user_id = u.user_id JOIN stories_likes_counter slc on s.story_id = slc.story_id JOIN stories_comments_counter scc on s.story_id = scc.story_id WHERE u.status = 1 AND community_subscriptions.user_id = ${user_id} AND c.community_id = ${type};`;
  const sqlSelectWithCom = `SELECT s.story_id,title,short_story,body,post_thumbnail,tags,c.community_id,c.community_title,s.created_at,total_likes,total_comments,u.user_id,full_name,username,email FROM community_subscriptions JOIN stories s on community_subscriptions.community_id = s.community_id JOIN communities c on s.community_id = c.community_id JOIN users u on s.user_id = u.user_id JOIN stories_likes_counter slc on s.story_id = slc.story_id JOIN stories_comments_counter scc on s.story_id = scc.story_id WHERE u.status = 1 AND community_subscriptions.user_id = ${user_id} AND c.community_id = ${type} ORDER BY s.story_id DESC LIMIT 12 OFFSET ${page};`;
  const sqlCount = `SELECT count(*) as count FROM community_subscriptions JOIN stories s on community_subscriptions.community_id = s.community_id JOIN communities c on s.community_id = c.community_id JOIN users u on s.user_id = u.user_id JOIN stories_likes_counter slc on s.story_id = slc.story_id JOIN stories_comments_counter scc on s.story_id = scc.story_id WHERE u.status = 1 AND community_subscriptions.user_id = ${user_id}`;
  const sqlSelect = `SELECT s.story_id,title,short_story,body,post_thumbnail,tags,c.community_id,c.community_title,s.created_at,total_likes,total_comments,u.user_id,full_name,username,email FROM community_subscriptions JOIN stories s on community_subscriptions.community_id = s.community_id JOIN communities c on s.community_id = c.community_id JOIN users u on s.user_id = u.user_id JOIN stories_likes_counter slc on s.story_id = slc.story_id JOIN stories_comments_counter scc on s.story_id = scc.story_id WHERE u.status = 1 AND community_subscriptions.user_id = ${user_id} ORDER BY s.story_id DESC LIMIT 12 OFFSET ${page};`;

  const sqlSelectWithUserCom = `SELECT s.story_id,title,short_story,body,post_thumbnail,tags,c.community_id,c.community_title,s.created_at,total_likes,total_comments,u.user_id,full_name,username,email,(SELECT count(*) FROM stories_likes WHERE stories_likes.story_id = s.story_id AND stories_likes.user_id =${user_id}) AS liked,(SELECT count(*) FROM stories_bookmarks WHERE stories_bookmarks.story_id = s.story_id AND stories_bookmarks.user_id =${user_id}) AS bookmarked,(SELECT count(*) FROM followers WHERE followers.user_id = u.user_id AND followers.follower_id =${user_id}) AS followed FROM community_subscriptions JOIN stories s on community_subscriptions.community_id = s.community_id JOIN communities c on s.community_id = c.community_id JOIN users u on s.user_id = u.user_id JOIN stories_likes_counter slc on s.story_id = slc.story_id JOIN stories_comments_counter scc on s.story_id = scc.story_id WHERE u.status = 1 AND community_subscriptions.user_id = ${user_id} AND c.community_id = ${type} ORDER BY s.story_id DESC LIMIT 12 OFFSET ${page}`;

  const sqlSelectWithUser = `SELECT s.story_id,title,short_story,body,post_thumbnail,tags,c.community_id,c.community_title,s.created_at,total_likes,total_comments,u.user_id,full_name,username,email,(SELECT count(*) FROM stories_likes WHERE stories_likes.story_id = s.story_id AND stories_likes.user_id =${user_id}) AS liked,(SELECT count(*) FROM stories_bookmarks WHERE stories_bookmarks.story_id = s.story_id AND stories_bookmarks.user_id =${user_id}) AS bookmarked,(SELECT count(*) FROM followers WHERE followers.user_id = u.user_id AND followers.follower_id =${user_id}) AS followed FROM community_subscriptions JOIN stories s on community_subscriptions.community_id = s.community_id JOIN communities c on s.community_id = c.community_id JOIN users u on s.user_id = u.user_id JOIN stories_likes_counter slc on s.story_id = slc.story_id JOIN stories_comments_counter scc on s.story_id = scc.story_id WHERE u.status = 1 AND community_subscriptions.user_id = ${user_id} ORDER BY s.story_id DESC  LIMIT 12 OFFSET ${page};`;

  //   if (type === '0') {
  //     db.query(sqlCount, (err, count) => {
  //     if (err) return res.status(500).json({ err: err.message });
  //       db.query(sqlSelect, (err, documents) => {
  //         console.log(err)
  //           if (err) return res.status(500).json({err: err.message});

  //         res.send({count: count[0].count, data: documents});
  //       });
  //     });
  //   } else if (type !== '0') {
  //     db.query(sqlComCount, (err, countCom) => {
  //     if (err) return res.status(500).json({ err: err.message });
  //       db.query(sqlSelectWithCom, (err, documents) => {
  //         console.log(err)
  //           if (err) return res.status(500).json({err: err.message});
  //         res.send({count: countCom[0].count, data: documents});
  //       });
  //     });
  //   }
  // };

  if (type === "0") {
    if (user_id != "undefined") {
      db.query(sqlCount, (err, count) => {
        if (err) return res.status(500).json({ err: err.message });
        db.query(sqlSelectWithUser, (err, documents) => {
          if (err) return res.status(500).json({ err: err.message });

          res.send({ data: documents, count: count[0].count });
        });
      });
    } else {
      db.query(sqlCount, (err, count) => {
        if (err) return res.status(500).json({ err: err.message });
        db.query(sqlSelect, (err, documents) => {
          if (err) return res.status(500).json({ err: err.message });

          res.send({ data: documents, count: count[0].count });
        });
      });
    }
  } else if (type !== "0") {
    if (user_id != "undefined") {
      db.query(sqlComCount, (err, count) => {
        if (err) return res.status(500).json({ err: err.message });

        db.query(sqlSelectWithUserCom, (err, documents) => {
          if (err) return res.status(500).json({ err: err.message });
          console.log("comUer", documents);
          res.send({ data: documents, count: count[0].count });
        });
      });
    } else {
      db.query(sqlComCount, (err, count) => {
        if (err) return res.status(500).json({ err: err.message });
        db.query(sqlSelectWithCom, (err, documents) => {
          console.log("com", documents);

          if (err) return res.status(500).json({ err: err.message });
          res.send({ data: documents, count: count[0].count });
        });
      });
    }
  }
};
