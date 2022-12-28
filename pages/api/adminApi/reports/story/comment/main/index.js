/* eslint-disable import/no-anonymous-default-export */

import auth from "../../../../../../../component/middleware/middleware";
import db from "../../../../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getReports(req, res);
      break;
    case "POST":
      await postReports(req, res);
      break;
    case "PATCH":
      await resolveReports(req, res);
      break;
  }
};

const postReports = async (req, res) => {
  const { comment_id, msg, user_id } = await req.body;
  const authData = await auth(req, res);
  try {
    if (authData.validated) {
      const sqlPost = `INSERT INTO reports (report_type, reported_story_comment_id, report_msg, from_user_id) VALUES (?,?,?,?)`;
      db.query(
        sqlPost,
        ["story_comment_report", comment_id, msg, user_id],
        (err, documents) => {
          if (err)
            return res.status(500).json({
              success: false,
              message: ["Database Error"],
              error_code: 1106,
              data: {},
            });
          return res.status(201).json({
            success: true,
            message: ["Successfully reported"],
            data: {},
          });
        }
      );
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

const getReports = async (req, res) => {
  const { page, status } = await req.query;
  const authData = await auth(req, res);
  try {
    if (authData.validated) {
      const sqlReportsCount = `SELECT count(*) as count FROM reports JOIN stories_comments sc on reported_story_comment_id = sc.story_comment_id JOIN stories s on sc.story_id = s.story_id JOIN users u on from_user_id = u.user_id JOIN users u2 on sc.user_id = u2.user_id WHERE report_type = 'story_comment_report' AND is_resolved = ${status}`;
      const sqlReports = `SELECT  report_id, report_type,reports.report_msg, from_user_id AS reporter_user_id,u.username as reporter_username, u.full_name AS reporter_fullname, s.story_id,s.title AS story_title, sc.message , sc.story_comment_id, sc.created_at AS comment_created_at, u2.user_id AS comment_owner_id, u2.username AS comment_owner_username,u2.full_name AS  commment_owner_fullname, reports.created_at AS report_created_at, is_resolved FROM reports JOIN stories_comments sc on reported_story_comment_id = sc.story_comment_id JOIN stories s on sc.story_id = s.story_id JOIN users u on from_user_id = u.user_id JOIN users u2 on sc.user_id = u2.user_id WHERE report_type = 'story_comment_report' AND is_resolved = ${status} LIMIT 12 OFFSET ${page};`;
      db.query(sqlReportsCount, (err, count) => {
        if (err)
          return res.status(500).json({
            success: false,
            message: ["Database Error"],
            error_code: 1106,
            data: {},
          });
        db.query(sqlReports, (err, documents) => {
          if (err)
            return res.status(500).json({
              success: false,
              message: ["Database Error"],
              error_code: 1106,
              data: {},
            });
          res
            .status(201)
            .json({ storyComment: documents, count: count[0].count });
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

const resolveReports = async (req, res) => {
  const { id } = await req.body;

  const authData = await auth(req, res);
  try {
    if (authData.validated) {
      const sqlReports = `UPDATE reports SET is_resolved = 1 WHERE report_id = ${id};`;
      db.query(sqlReports, (err, count) => {
        if (err)
          return res.status(500).json({
            success: false,
            message: ["Database Error"],
            error_code: 1106,
            data: {},
          });
        res.send({ success: "Resolved Successfully" });
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
