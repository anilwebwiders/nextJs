/* eslint-disable import/no-anonymous-default-export */

import auth from "../../../../component/middleware/middleware";
import db from "../../../../utils/connectDB";
import awsTransporter from "../../../../utils/awsTransporter";
import emailTemp from '../../../../utils/emailTemplates/account-deleted.html'

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await deleteProfile(req, res);
      break;
    
  }
};

const deleteProfile = async (req, res) => {
  const  {user_id, full_name, email}  = await req.body;

  if (user_id) {
    try {
      const authData = await auth(req, res);
      if (authData.validated) {
        const sqlStory = `UPDATE fnmotivation.users t SET t.status = 2 WHERE user_id = '${user_id}'`;
        db.query(sqlStory, (err, documents) => {
          if (err) return res.status(500).json({ err: err.message });

          const emailData = emailTemp.replace('[personName]', full_name)

          const mailOptions = {
            from: process.env.EM_USER,
            to: email,
            subject: 'FNMotivation Account Deleted! .',
            html: emailData,
          };
        
          awsTransporter.sendMail(mailOptions, function (err, info) {
            if (err) return res.status(500).json({ err: err.message });
           
          });

          res.status(201).json({success: 'Profile deleted successfully'});
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
  }
};

