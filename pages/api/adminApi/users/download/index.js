/* eslint-disable import/no-anonymous-default-export */

import auth from "../../../../../component/middleware/middleware";
import db from "../../../../../utils/connectDB";
import ExcelJS from 'exceljs';

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await download(req, res);
      break;
  }
};

const download = async (req, res) => {
  const authData = await auth(req, res);
  try {
    if (authData.validated) {
      const sqlUser= `select * from users`;
      db.query(sqlUser, (err, userData) => {
          if (err) return res.status(500).json({err: err.message});
        const user = [];
        userData.forEach((item) => {
            user.push({
                user_id: item.user_id,
                fullname: item.full_name,
                username: item.username,
                role: item.role,
                email: item.email,
                method: item.facebook_id && 'Facebook' || item.google_id && 'Gmail' || !item.facebook_id && !item.google_id && 'Email',
                gender: item.gender,
                dob: item.dob,
                created_at: item.created_at,
                status: item.status == '1' ? 'active' : 'Inactive'
            });
        });
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('FNMotivation Users Data');
        worksheet.columns = [
            { header: 'User ID', key: 'user_id', width: 10 },
            { header: 'Name', key: 'fullname', width: 50 },
            { header: 'User Name', key: 'username', width: 50 },
            { header: 'Role', key: 'role', width: 50 },
            { header: 'Email', key: 'email', width: 50 },
            { header: 'Method', key: 'method', width: 50 },
            { header: 'Gender', key: 'gender', width: 10 },
            { header: 'Birthday', key: 'dob', width: 15 },
            { header: 'Created', key: 'created_at', width: 15 },
            { header: 'Status', key: 'status', width: 15 }
        ];
        worksheet.addRows(user)

        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + "FNMotivation Users Data.xlsx"
        );
        return workbook.xlsx.write(res).then(function () {
            res.status(200).end();
        });

      });
    }else{
        return res.status(500).json({err: 'Can not authorized'});
    }
  } catch (err) {
    return  res.status(500).json({
              success: false,
              message: ["Server Error"],
              error_code: 1000,
              data: {},
            });
  }
};
