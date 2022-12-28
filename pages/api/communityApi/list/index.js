/* eslint-disable import/no-anonymous-default-export */
import db from "../../../../utils/connectDB";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await community(req, res);
      break;
  }
};

const community = async (req, res) => {
  const count = `SELECT * FROM communities`;

  db.query(count, (err, doc) => {
    if (err)
      return res.status(500).json({
        success: false,
        message: ["An unexpected error occurred."],
        error_code: 1106,
         data: err,
      });
    res.status(201).json({
      success: true,
      message: ["Get All Community Lists."],
      data: doc,
    });
  });
};
