/* eslint-disable import/no-anonymous-default-export */

import auth from "../../../../component/middleware/middleware";
import db from "../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await follow(req, res);
      break;
    case "GET":
      await getFollow(req, res);
      break;
  }
};

const getFollow = async (req, res) => {
  const { user_id, follower_id } = await req.query;
  if (user_id && follower_id) {
    try {
      const authData = await auth(req, res);
      if (authData.validated) {
        const sqlStory = `SELECT * FROM followers WHERE user_id = ${user_id} AND follower_id = ${follower_id};`;
        db.query(sqlStory, (err, documents) => {
          if (err) return res.status(500).json({ err: err.message });
          return res.status(201).json({
            success: true,
            message: ["Get Follow"],
            data: documents,
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
  }
};

const follow = async (req, res) => {
  const { user_id, follower_id } = await req.body;
  try {
    const authData = await auth(req, res);
    if (authData.validated) {
      const sqlStory = `CALL autofollow(${follower_id},${user_id})`;
      db.query(sqlStory, (err, documents) => {
        if (err) return res.status(500).json({ err: err.message });
        return res.status(201).json({
          success: true,
          message: ["Follow User"],
          data: { follow: true },
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
