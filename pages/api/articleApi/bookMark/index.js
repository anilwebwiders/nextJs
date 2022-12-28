/* eslint-disable import/no-anonymous-default-export */
import auth from "../../../../component/middleware/middleware";
import db from "../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await bookMarkArticle(req, res);
      break;
    case "GET":
      await getBookMarkArticle(req, res);
      break;
  }
};

const getBookMarkArticle = async (req, res) => {
  let { article_id, user_id } = await req.query;
  const sqlBookmark = `SELECT * from articles_bookmarks WHERE article_id = ${article_id} AND user_id = ${user_id}`;
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
};

const bookMarkArticle = async (req, res) => {
  const authData = await auth(req, res);
  if (authData.validated) {
    let { article_id, user_id } = await req.body;
    if (article_id && user_id) {
      const sqlBookmark = `CALL auto_article_bookmark(${article_id},${user_id})`;
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
  }
};
