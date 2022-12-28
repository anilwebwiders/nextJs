// import auth from "../../../../component/middleware/middleware";
// import db from "../../../../utils/connectDB";
// import emailStory from "../../../../utils/emailTemplates/story-published.html";
// import awsTransporter from "../../../../utils/awsTransporter";
// import nextConnect from "next-connect";
// import multer from "multer";
// import sharp from "sharp";
// const AWS = require("aws-sdk");

// import momentTime from "moment-timezone";

// const apiRoute = nextConnect({
//   onError(error, req, res) {
//     console.log(error);
//     res
//       .status(501)
//       .json({ error: `Sorry something Happened! ${error.message}` });
//   },
//   onNoMatch(req, res) {
//     res.status(405).json({ error: `Method "${req.method}" Not Allowed` });
//   },
// });

// apiRoute.use(multer().any());

// apiRoute.post(async (req, res) => {
//   let {
//     title,
//     communityId,
//     summary,
//     body,
//     tags,
//     image,
//     user_id,
//     email,
//     name,
//     file,
//     type,
//   } = req.body;

//   if (
//     !title ||
//     !communityId ||
//     !summary ||
//     !body ||
//     !tags ||
//     !image ||
//     !user_id ||
//     !email ||
//     !name
//   )
//     return res.status(500).json({
//       success: false,
//       message: [
//         ` ${
//           !title ||
//           !communityId ||
//           !summary ||
//           !body ||
//           !tags ||
//           !image ||
//           !user_id ||
//           !email ||
//           !name
//         } Some fields are required.`,
//       ],
//       error_code: 1307,
//       data: {},
//     });

//   image ? image : "null";

//   if (file.length > 4)
//     return res.status(500).json({
//       success: false,
//       message: ["Can not add more than 4 links"],
//       error_code: 1112,
//       data: {},
//     });

//   const sqlSelect = `INSERT INTO stories (title, community_id, short_story, post_thumbnail, body, tags, user_id) values(?,?,?,?,?,?,?)`;
//   db.query(
//     sqlSelect,
//     [
//       title,
//       communityId,
//       summary?.substring(0, 70),
//       image,
//       body,
//       tags?.toString(),
//       user_id,
//     ],
//     async (err, documents) => {
//       console.log(err);
//       if (err)
//         return res.status(500).json({
//           success: false,
//           message: ["Database Error"],
//           error_code: 1106,
//           data: {},
//         });

//       if (file.length > 0) {
//         //File Upload
//         file.map(async (i, idx) => {
//           // console.log(i);

//           const postFiles = `INSERT INTO story_contents (story_id, content_type, content_link) values(?,?,?)`;
//           db.query(
//             postFiles,
//             [documents.insertId, type[idx], i],
//             (err, imagePosted) => {
//               console.log(err);
//               if (err)
//                 return res.status(500).json({
//                   success: false,
//                   message: ["Can't  upload file right now"],
//                   error_code: 1200,
//                   data: {},
//                 });

//               if (idx == file.length - 1) {
//                 console.log("go");
//                 const sqlEmail = `SELECT story_post FROM email_notification_settings WHERE user_id = ${user_id}`;
//                 db.query(sqlEmail, (err, postEmail) => {
//                   if (postEmail[0].story_post == 1) {
//                     let emailTemp = emailStory
//                       .replace("[personName]", name)
//                       .replace("[textType]", "story")
//                       .replace(
//                         "[url]",
//                         `https://www.fnmotivation.com/story/${
//                           documents.insertId
//                         }/${title.substring(0, 60).replace(/\s/g, "-")}`
//                       )
//                       .replace("[post]", title);

//                     const mailOptions = {
//                       from: process.env.EM_USER,
//                       to: email,
//                       subject: "FNMotivation Story posted successfully",
//                       html: emailTemp,
//                     };

//                     awsTransporter.sendMail(
//                       mailOptions,
//                       function (err, response) {
//                         if (err) {
//                           console.log(err);
//                         } else {
//                         }
//                       }
//                     );
//                   }
//                 });
//                 return res.status(201).json({
//                   success: true,
//                   message: ["Story Posted Successfully"],
//                   data: {
//                     redirect: `/story/${documents.insertId}/${title
//                       .substring(0, 60)
//                       .replace(/\s/g, "-")}`,
//                     story_id: documents.insertId,
//                   },
//                 });
//               }
//             }
//           );

//           //Post Image End
//         });
//       } else {
//         const sqlEmail = `SELECT story_post FROM email_notification_settings WHERE user_id = ${user_id}`;
//         db.query(sqlEmail, (err, postEmail) => {
//           if (postEmail[0].story_post == 1) {
//             let emailTemp = emailStory
//               .replace("[personName]", name)
//               .replace("[textType]", "story")
//               .replace(
//                 "[url]",
//                 `https://www.fnmotivation.com/story/${
//                   documents.insertId
//                 }/${title.substring(0, 60).replace(/\s/g, "-")}`
//               )
//               .replace("[post]", title);

//             const mailOptions = {
//               from: process.env.EM_USER,
//               to: email,
//               subject: "FNMotivation Story posted successfully",
//               html: emailTemp,
//             };

//             awsTransporter.sendMail(mailOptions, function (err, response) {
//               if (err) {
//                 console.log(err);
//               } else {
//               }
//             });
//           }
//         });
//         return res.status(201).json({
//           success: true,
//           message: ["Story Posted Successfully"],
//           data: {
//             redirect: `/story/${documents.insertId}/${title
//               .substring(0, 60)
//               .replace(/\s/g, "-")}`,
//             story_id: documents.insertId,
//           },
//         });
//       }
//     }
//   );

//   // file.map(i=> i.mimetype.includes('image') )
// });
// // }

// export default apiRoute;

// export const config = {
//   api: {
//     bodyParser: false, // Disallow body parsing, consume as stream
//   },
// };

