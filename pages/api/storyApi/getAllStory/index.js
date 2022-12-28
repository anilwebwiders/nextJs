/* eslint-disable import/no-anonymous-default-export */
import db from "../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAllStory(req, res);
      break;
  }
};

const getAllStory = async (req, res) => {
  const sqlSelect = `SELECT story_id,title,community_id,short_story,body,post_thumbnail,tags,stories.user_id,stories.created_at AS stories_created_at,stories.updated_at AS stories_updated_at,stories.is_deleted AS stories_is_deleted,c.id,community_title,image_url,c.is_deleted AS communtiy_is_deleted,u.user_id AS user_id_from_user_table,fullname,username,email,u.created_at AS USER_CREATED_AT,u.updated_at AS USER_updated_at,status,u.is_deleted AS USER_IS_DELETED from stories INNER JOIN communities c on stories.community_id = c.id INNER JOIN users u on stories.user_id = u.user_id WHERE stories.is_deleted = 0`;
  db.query(sqlSelect, (err, documents) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json(JSON.stringify(documents));
  });
};
