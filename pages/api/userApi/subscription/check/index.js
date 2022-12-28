/* eslint-disable import/no-anonymous-default-export */

import auth from "../../../../../component/middleware/middleware";
import db from "../../../../../utils/connectDB";


export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await checkSub(req, res);
      break;
  }
};

const checkSub = async (req, res) => {
  const {user_id} = await req.query;
  try {
    const authData = await auth(req, res);
    if (authData.validated) {
      const sqlUser = `SELECT subscribe_newsletter from users where user_id =  ${user_id}`;
      db.query(sqlUser, (err, documents) => {
          if (err) return res.status(500).json({err: err.message});
        res.status(201).json(documents);
      });
    }
  } catch (err) {
    return  res.status(500).json({
              success: false,
              message: ["Server Error"],
              error_code: 1000,
              data: {},
            });
  }
};
