/* eslint-disable import/no-anonymous-default-export */

import auth from "../../../../../component/middleware/middleware";
import db from "../../../../../utils/connectDB";


export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAllusersCount(req, res);
      break;
  }
};

const getAllusersCount = async (req, res) => {
  const authData = await auth(req, res);
  try {
    if (authData.validated) {
      const sqlUserActive = `SELECT count(*) as active FROM users WHERE status = 1`;
      const sqlUserInActive = `SELECT count(*) as inActive FROM users WHERE status = 0`;
      db.query(sqlUserActive, (err, active) => {
          if (err) return res.status(500).json({err: err.message});
        db.query(sqlUserInActive, (err, InActive) => {
            if (err) {
              console.log(err);
            }
            res.status(201).json({...active[0], ...InActive[0]});
          });
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
