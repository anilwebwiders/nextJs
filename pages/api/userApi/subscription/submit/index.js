/* eslint-disable import/no-anonymous-default-export */

import auth from "../../../../../component/middleware/middleware";
import { validUserType } from "../../../../../component/middleware/valid";
import db from "../../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await submitSub(req, res);
      break;
  }
};

const submitSub = async (req, res) => {
  const { user_id, userType } = await req.body;

  const error = await validUserType(userType);
  if (error.message.length > 0) return res.status(400).json(error);

  try {
    const authData = await auth(req, res);
    if (authData.validated) {
      const sqlUserType = `UPDATE fnmotivation.users t SET t.role = '${userType}' where user_id =  ${user_id}`;
      const sqlUser = `UPDATE fnmotivation.users t SET t.subscribe_newsletter = 1 where user_id =  ${user_id}`;
      db.query(sqlUserType, (err, documents) => {
        console.log(err);
        if (err)
          return res.status(500).json({
            success: false,
            message: ["An unexpected error occurred."],
            error_code: 1106,
             data: err,
          });
        db.query(sqlUser, (err, documents) => {
          console.log(err);
          if (err)
            return res.status(500).json({
              success: false,
              message: ["An unexpected error occurred."],
              error_code: 1106,
               data: err,
            });
          res.status(201).json({
            success: true,
            message: ["User Type Updated Successfully."],
            data: {},
          });
        });
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: ["An unexpected error occurred."],
      error_code: 1106,
      data: err,
    });
  }
};
