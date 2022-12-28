/* eslint-disable import/no-anonymous-default-export */
import auth from "../../../../component/middleware/middleware";
import db from "../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await likePost(req, res);
      break;
    case "GET":
      await likeGet(req, res);
      break;
  }
};

const likeGet = async (req, res) => {
  let { article_id, user_id } = await req.query;
  const sqlLike = `SELECT * from articles_likes WHERE article_id = ${article_id}`;
  db.query(sqlLike, (err, documents) => {
    if (err) return res.status(500).json({err: err.message});
    res.send(documents);
  });
};

const likePost = async (req, res) => {
  const authData = await auth(req, res);
  if (authData.validated) {
    let { article_id, user_id } = await req.body;
   if( article_id && user_id ){
    const sqlLike = `CALL autoarticlelike(${article_id},${user_id})`;
    db.query(sqlLike, (err, documents) => {
        if (err) return res.status(500).json({err: err.message});
      res.send({ msg: "sucess" });
    });
   }
  }
};
