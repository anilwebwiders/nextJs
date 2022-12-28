// import nextConnect from "next-connect";
// import postImage from "../../../../component/middleware/postImage";
// import { generateName } from "../../../../utils/generateName";
// const fs = require("fs");
// const AWS = require("aws-sdk");
// const resizeImg = require("resize-image-buffer");
// import sharp from "sharp";

// const handler = nextConnect();
// handler.use(postImage);

// const s3 = new AWS.S3({
//   accessKeyId: process.env.S3_UPLOAD_KEY,
//   secretAccessKey: process.env.S3_UPLOAD_SECRET,
// });

// handler.post(async (req, res) => {
//   const name = await generateName();
//   // const file = fs.readFileSync(req.files.upload[0].path);
//   // const fileContent = Buffer.from(file, "binary");

//   // const image = await resizeImg(fs.readFileSync(req.files.upload[0].path), {
//   //   width: 500,
//   //   height: 500,
//   // });

//   const data = await fs.readFileSync(req.files.upload[0].path);

//   const image = await sharp(data)
//     .resize(854, 480, {
//       fit: "cover",
//       position: "center",
//     })
//     .toBuffer();

//   // Setting up S3 upload parameters
//   const params = {
//     Bucket: process.env.S3_UPLOAD_BUCKET,
//     Key: `${name}${req.files.upload[0].originalFilename}`, // File name you want to save as in S3
//     Body: image,
//   };

//   // Uploading files to the bucket
//   s3.upload(params, function (err, data) {
//     if (err) {
//       res.status(500).json({ err: "Can not upload image try again!" });
//       throw err;
//     }

//     return res.status(201).json({
//       success: true,
//       message: ["Image Uploaded Successfully"],
//       data: {
//         url: data.Location,
//       },
//     });
//   });
// });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default handler;




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

// const s3 = new AWS.S3({
//   accessKeyId: process.env.S3_UPLOAD_KEY,
//   secretAccessKey: process.env.S3_UPLOAD_SECRET,
// });
// let date = momentTime.tz(new Date(), "Asia/Dhaka").format();
// const filterDate = date.split("T")[0];

// function makeid(length) {
//   var result = "";
//   var characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   var charactersLength = characters.length;
//   for (var i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }

// const imageResize = async (i) => {
//   return await sharp(i)
//     .resize(854, 480, {
//       fit: "cover",
//       position: "center",
//     })
//     .toBuffer();
// };
// apiRoute.post(async (req, res) => {
//   let file = req.files;

//   if (file.length > 3)
//     return res.status(500).json({
//       success: false,
//       message: ["More than 3 files can not be uploaded."],
//       error_code: 1126,
//       data: {},
//     });

//   let fileData = [];
//   if (file.length > 0) {
//     //File Upload
//     file.map(async (i, idx) => {
//       // console.log(i);

//       const params = {
//         Bucket: process.env.S3_UPLOAD_BUCKET,
//         Key: `${makeid(50)}${filterDate}${i.originalname}`, // File name you want to save as in S3
//         Body: i.mimetype.includes("image")
//           ? await imageResize(i.buffer)
//           : i.buffer,
//       };

//       // Uploading files to the bucket

//       s3.upload(params, function (err, data) {
//         console.log(err);
//         if (err) {
//           res.status(500).json({ err: "Can not upload image try again!" });
//           throw err;
//         }
//         console.log(data);
//         //Post Image
//         fileData.push({...data, type: i.mimetype.includes('image') ? 1 : 2 });
//         if (idx == file.length - 1) {
//           console.log(fileData);
//           return res.status(201).json({
//             success: true,
//             message: ["Image Uploaded Successfully"],
//             fileLinks: fileData,
//           });
//         }
//       });

//       //Post Image End
//     });
//   }
// });

// export default apiRoute;

// export const config = {
//   api: {
//     bodyParser: false, // Disallow body parsing, consume as stream
//   },
// };

