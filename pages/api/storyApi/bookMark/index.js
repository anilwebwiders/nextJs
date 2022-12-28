/* eslint-disable import/no-anonymous-default-export */
import auth from "../../../../component/middleware/middleware";
import db from "../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await bookMarkStory(req, res);
      break;
    case "GET":
      await getBookMarkStory(req, res);
      break;
  }
};

const getBookMarkStory = async (req, res) => {
  let { story_id, user_id } = await req.query;
  if (story_id && user_id) {
    const sqlBookmark = `SELECT * from stories_bookmarks WHERE story_id = ${story_id} AND user_id = ${user_id}`;
    db.query(sqlBookmark, (err, documents) => {
    if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
      res.send(documents);
    });
  }
};

const bookMarkStory = async (req, res) => {
  const authData = await auth(req, res);
  if (authData.validated) {
    let { story_id, user_id } = await req.body;
    const sqlBookmark = `CALL auto_story_bookmarks(${story_id},${user_id})`;
    db.query(sqlBookmark, (err, documents) => {
    if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
      res.send({ msg: "sucess" });
    });
  }
};
