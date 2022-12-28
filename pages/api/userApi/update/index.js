/* eslint-disable import/no-anonymous-default-export */
import auth from "../../../../component/middleware/middleware";
import db from "../../../../utils/connectDB";
import { changeText, changeValues } from "../../../../utils/replace";

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await user(req, res);
      break;
  }
};

const user = async (req, res) => {
  let { user_id, full_name, email, username, about, image } = req.body;
  full_name = await changeValues(full_name);
  email = await changeValues(email);
  username = await changeValues(username);
  about = about ? await changeText(about) : " ";
  image ? image : "/avatar.png";

  const authData = await auth(req, res);
  if (authData.validated) {
    const sqlCheck = `SELECT * from temporary_users WHERE email = '${email}' or username = '${username}'`;
    const sqlMainCheck = `SELECT * from users WHERE email = '${email}' or username = '${username}'`;
    db.query(sqlMainCheck, (err, em) => {
    if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
      // Main Check
      if (em[0].email === email && em[0].user_id !== user_id)
        return res.status(500).json({ err: "Email already registered." });
      if (em[0].username === username && em[0].user_id !== user_id)
        return res.status(500).json({ err: "Username already takes." });
      // Temp Check
      db.query(sqlCheck, (err, emCheck) => {
      if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
        if (emCheck.length > 0)
          if (emCheck[0].email === email && emCheck[0].user_id !== user_id)
            return res.status(500).json({ err: "Email already registered." });
        if (emCheck.length > 0)
          if (
            emCheck[0].username === username &&
            emCheck[0].user_id !== user_id
          )
            return res.status(500).json({ err: "Username already takes." });
        const sqlUserUpdate = `UPDATE fnmotivation.users
          t SET t.full_name = '${full_name}',
          t.email = '${email}',
          t.username = '${username}',
          t.about = '${about}',
          t.avatar = '${image}'
          WHERE user_id = ${user_id}`;

        db.query(sqlUserUpdate, (err, documents) => {
          console.log(err);
          if (err)
            return res.status(500).json({ err: "Can not update right now" });
          res.status(201).json({ success: "Updated successfully" });
        });
      });
    });
  }
};
