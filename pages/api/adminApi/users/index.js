/* eslint-disable import/no-anonymous-default-export */

import auth from "../../../../component/middleware/middleware";
import db from "../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAllusers(req, res);
      break;
    case "PATCH":
      await banUser(req, res);
      break;
  }
};

const getAllusers = async (req, res) => {
  const {status, order, page} = await req.query;
  const authData = await auth(req, res);
  try {
    if (authData.validated) {
      const sqlUser = `SELECT * FROM users WHERE status = ${status} ORDER BY user_id ${order} LIMIT 20 OFFSET ${page}`;
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

const banUser = async (req, res) => {
  const {value, id} = await req.body;

  const authData = await auth(req, res);
  try {
    if (authData.validated) {
      const sqlUser = `UPDATE fnmotivation.users t SET t.status = ${value} WHERE user_id = '${id}'`;
      db.query(sqlUser, (err, documents) => {
          if (err) return res.status(500).json({err: err.message});
        res.status(201).json({success: 'Updated Successfully'});
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
