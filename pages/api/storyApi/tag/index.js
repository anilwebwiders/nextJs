/* eslint-disable import/no-anonymous-default-export */
import db from "../../../../utils/connectDB";
import { changeText } from "../../../../utils/replace";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await search(req, res);
      break;
  }
};

const search = async (req, res) => {
  let {show, tag }= await req.query;
  tag = changeText(tag)
  const sqlCount = `SELECT count(*) as count FROM stories JOIN users u on stories.user_id = u.user_id JOIN communities c on stories.community_id = c.community_id WHERE u.status = 1 AND  stories.tags LIKE '%${tag}%';`
  const sqlSearch = `SELECT story_id,title,short_story,body,post_thumbnail,tags,c.community_id,c.community_title,stories.created_at,u.user_id,full_name,username,email FROM stories JOIN users u on stories.user_id = u.user_id JOIN communities c on stories.community_id = c.community_id WHERE u.status = 1 AND  stories.tags LIKE '%${tag}%'  ORDER BY stories.story_id DESC LIMIT 12 OFFSET ${show};`;

  db.query(sqlCount, (err, count) => {
    if (err) {
      console.log(err);
    } 
    db.query(sqlSearch, (err, documents) => {
    if (err) return res.status(500).json({ err: err.message });
      res.send({data: documents, count: count});
    });
  });
};
