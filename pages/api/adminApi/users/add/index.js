/* eslint-disable import/no-anonymous-default-export */
import md5 from "md5";
import db from "../../../../../utils/connectDB";


export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await addUser(req, res);
      break;
  }
};

const addUser = async (req, res) => {
  const { fullname, username, email, password, gender, dob } = req.body;
  const sqlInsertUser = `INSERT INTO  users (full_name,username,email,password,gender,role,dob) values(?,?,?,?,?,?,?)`;

  db.query(
    sqlInsertUser,
    [
      fullname,
      username.toLowerCase(),
      email.toLowerCase(),
      md5(password),
      gender,
      "user",
      dob,
    ],
    (err, user) => {
    if (err)
              return res.status(500).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });
      res.status(201).json({
        user: "User Added Successfully",
      });
    }
  );
};
