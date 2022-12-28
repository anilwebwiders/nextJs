/* eslint-disable import/no-anonymous-default-export */

import auth from "../../../../../component/middleware/middleware";
import db from "../../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getSearch(req, res);
      break;
  }
};

const getSearch = async (req, res) => {
  const { order, page, status, search } = req.query;
  const authData = await auth(req, res);
  try {
    if (authData.validated) {
      const sqlCount = `SELECT count(*) as count
      FROM users WHERE (users.full_name LIKE  ('%${search}%') OR users.username LIKE ('%${search}%') OR users.email LIKE ('%${search}%') ) AND status = ${status}`;
      const sqlUsers = `SELECT user_id,full_name,username,email,gender,role,avatar,created_at,status FROM users WHERE (users.full_name LIKE  ('%${search}%') OR users.username LIKE ('%${search}%') OR users.email LIKE ('%${search}%') ) AND status = ${status} ORDER BY user_id ${order} LIMIT 12 OFFSET ${page}`;
      db.query(sqlUsers, (err, users) => {
      if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
        db.query(sqlCount, (err, count) => {
        if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
          res.status(201).json({ users: users, count: count[0].count });
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
