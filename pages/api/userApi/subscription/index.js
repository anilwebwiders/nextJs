/* eslint-disable import/no-anonymous-default-export */

import auth from "../../../../component/middleware/middleware";
import db from "../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getSub(req, res);
      break;
    case "POST":
      await postSub(req, res);
      break;
  }
};

const getSub = async (req, res) => {
  const { user_id } = await req.query;
  try {
    const authData = await auth(req, res);
    if (authData.validated) {
      const sqlUser = `SELECT community_subscription_id,user_id,community_subscriptions.community_id,community_title,image_url,(SELECT count(*) FROM community_subscriptions WHERE user_id = 1) AS total_subscriptions,created_at
      FROM community_subscriptions JOIN communities c on community_subscriptions.community_id = c.community_id WHERE community_subscriptions.user_id = ${user_id};`;
      db.query(sqlUser, (err, documents) => {
        if (err)
          return res.status(500).json({
            success: false,
            message: ["An unexpected error occurred."],
            error_code: 1106,
            data: err,
          });
        res.status(201).json({
          success: true,
          message: ["Get User Subscribed community Lists."],
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
};
const postSub = async (req, res) => {
  // const { user_id, community_id } = await req.body;

  const { data, user_id } = await req.body;

  const last = data[data.length - 1];

  if (data.length === 0)
    return res.status(500).json({
      success: false,
      message: ["Please add at least one community"],
      error_code: 1307,
      data: {},
    });

  try {
    const authData = await auth(req, res);

    if (authData.validated) {
      // const sqlUser = `CALL auto_community(${user_id},${community_id});`;

      //Delete
      const sqlUser = `DELETE FROM community_subscriptions where user_id = ${user_id}`;
      db.query(sqlUser, (err, documents) => {
        if (err)
          return res.status(500).json({
            success: false,
            message: ["An unexpected error occurred."],
            error_code: 1106,
            data: err,
          });
        for (let i = 0; i < data.length; i++) {
          const sqlUser = `INSERT INTO community_subscriptions (user_id, community_id) VALUES (?,?)`;
          db.query(
            sqlUser,
            [user_id, data[i].community_id],
            (err, documents) => {
              if (last.community_id == data[i].community_id) {
                if (err)
                  return res.status(500).json({
                    success: false,
                    message: ["An unexpected error occurred."],
                    error_code: 1106,
                    data: err,
                  });
                res.status(201).json({
                  success: true,
                  message: ["Subscribed Successfully."],
                  data: {},
                });
              }
            }
          );
        }
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
