/* eslint-disable import/no-anonymous-default-export */

import db from "../../../../../utils/connectDB";
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await Verification(req, res);
      break;
  }
};

const Verification = async (req, res) => {
  const code = await req.body.code;
  try {
    const sqlUser = `SELECT * from email_verification where verification_code = '${code}'`;
    db.query(sqlUser, (err,doc)=>{
      if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
        if(doc.length === 0) return res.status(500).json({ err: 'Invalid Token' });
        if(doc[0].verification_code !== code) return res.status(500).json({ err: 'Invalid Token' });
        if(doc[0].verification_code === code) return res.status(201).json({ email: doc[0].email });
    })
  } catch (err) {
    return  res.status(500).json({
              success: false,
              message: ["Server Error"],
              error_code: 1000,
              data: {},
            });
  }
};
