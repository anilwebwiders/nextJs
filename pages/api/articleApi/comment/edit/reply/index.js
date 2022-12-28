/* eslint-disable import/no-anonymous-default-export */

import auth from "../../../../../../component/middleware/middleware";
import db from "../../../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await edit(req, res);
      break;
  }
};
const edit = async (req, res) => {
  let { message, ac_reply_id } = await req.body;
  const authData = await auth(req, res);
  if (authData.validated) {
    const sqlPost = `UPDATE fnmotivation.articles_comments_reply t SET t.ac_reply_text = '${message}' WHERE ac_reply_id = '${ac_reply_id}'`;
    db.query(sqlPost, (err, documents) => {
      if (err)
        return res.status(500).json({
          success: false,
          message: ["Database Error"],
          error_code: 1106,
          data: {},
        });
      return res.status(201).json({
        success: true,
        message: ["Successfully Updated"],
        data: {},
      });
    });
  }
};
