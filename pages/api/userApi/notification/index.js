/* eslint-disable import/no-anonymous-default-export */

import auth from "../../../../component/middleware/middleware";
import db from "../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await notification(req, res);
      break;
    case "PATCH":
      await notificationPatch(req, res);
      break;
    case "DELETE":
      await notificationDelete(req, res);
      break;
  }
};

const notification = async (req, res) => {
  let { user_id, show } = await req.query;
  show = (await show) * 10;
  try {
    const sqlNoti = `SELECT * FROM notifications WHERE notification_for_user_id = ${user_id} ORDER BY notification_id DESC LIMIT 10 OFFSET ${show}`;
    const authData = await auth(req, res);
    if (authData.validated) {
      db.query(sqlNoti, (err, doc) => {
        if (err)
          return res.status(500).json({
            success: false,
            message: ["Database Error"],
            error_code: 1106,
            data: {},
          });
        res.status(201).json(doc);
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: ["Server Error"],
      error_code: 1000,
      data: {},
    });
  }
};

const notificationPatch = async (req, res) => {
  const { id } = await req.body;

  try {
    const sqlNoti = `UPDATE fnmotivation.notifications t SET t.is_seen = 1 WHERE notification_id= ${id}`;
    const authData = await auth(req, res);
    if (authData.validated) {
      db.query(sqlNoti, (err, doc) => {
        if (err)
          return res.status(500).json({
            success: false,
            message: ["Database Error"],
            error_code: 1106,
            data: {},
          });
        res.status(201).json({ success: true });
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: ["Server Error"],
      error_code: 1000,
      data: {},
    });
  }
};

const notificationDelete = async (req, res) => {
  const { id } = await req.query;
  try {
    const sqlNoti = `DELETE from notifications WHERE notification_id=${id}`;
    const authData = await auth(req, res);
    if (authData.validated) {
      db.query(sqlNoti, (err, doc) => {
        if (err)
          return res.status(500).json({
            success: false,
            message: ["Database Error"],
            error_code: 1106,
            data: {},
          });
          return res.status(201).json({
            success: true,
            message: ["Notification Deleted Successfully"],
            data: {},
          });
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: ["Server Error"],
      error_code: 1000,
      data: {},
    });
  }
};
