/* eslint-disable import/no-anonymous-default-export */

import db from "../../../../../../utils/connectDB";
import { changeText } from "../../../../../../utils/replace";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await story(req, res);
      break;
  }
};

const story = async (req, res) => {
  let {show, search, user_id }= await req.query;
  search = changeText(search)
  const sqlCount = `SELECT count(*) as count FROM stories JOIN users u on stories.user_id = u.user_id JOIN communities c on stories.community_id = c.community_id WHERE u.status = 1 AND  (short_story LIKE  ('%${search}%') OR body LIKE ('%${search}%') OR title LIKE ('%${search}%')) AND u.user_id = 8 AND u.user_id = ${user_id}`
  const sqlSearch = `SELECT stories.story_id,title,short_story,body,post_thumbnail,tags,c.community_id,c.community_title,stories.created_at,total_likes,total_comments,u.user_id,full_name,username,email FROM stories JOIN users u on stories.user_id = u.user_id JOIN communities c on stories.community_id = c.community_id JOIN stories_likes_counter slc on stories.story_id = slc.story_id JOIN stories_comments_counter scc on stories.story_id = scc.story_id WHERE u.status = 1 AND  (short_story LIKE  ('%${search}%') OR body LIKE ('%${search}%') OR title LIKE ('%${search}%')) AND u.user_id = ${user_id} ORDER BY stories.story_id DESC LIMIT 12 OFFSET ${show};`;

  db.query(sqlCount, (err, count) => {
    if (err) {
      console.log('err',err);
    } 
    console.log('count',count);
    db.query(sqlSearch, (err, documents) => {
    if (err) return res.status(500).json({ err: err.message });
      res.send({data: documents, count: count[0].count});
    });
  });
};


