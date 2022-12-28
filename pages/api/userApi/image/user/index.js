// /* eslint-disable import/no-anonymous-default-export */
// import formidable from "formidable";
// var AWS = require("aws-sdk");

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // export default async (req, res) => {
// //   AWS.config.update({
// //     accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY, // Access key ID
// //     secretAccesskey: process.env.AWS_BUCKET_SECRET_KEY, // Secret access key
// //     region: "us-east-1", //Region
// //   });
// //   console.log(req.file);
// // };

// export default async (req, res) => {

//   AWS.config.update({
//     accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY, // Access key ID
//     secretAccesskey: process.env.AWS_BUCKET_SECRET_KEY, // Secret access key
//     region: "us-east-1", //Region
//   });
//   const s3 = new AWS.S3()

//   const form = new formidable.IncomingForm();
//   // form.uploadDir = "./public/img/userImages";
//   form.keepExtensions = true;
//   form.parse(req, (err, fields, files) => {
//     console.log(fields, files.upload);
//     if (err)
//       return res
//         .status(500)
//         .json({ err: "Error occured can not upload the file." });

//       //   const params = {
//       //     Bucket: process.env.AWS_BUCKET_NAME,
//       //     Key: files.upload.name, // File name you want to save as in S3
//       //     Body: files.upload 
//       // };
//       //   s3.upload(params, (err, data) => {
//       //     if (err) {
//       //         throw err;
//       //     }
//       //     
//           // res.send({
//           //     "response_code": 200,
//           //     "response_message": "Success",
//           //     "response_data": data
//           // });
//       // });
//     // const fileName = files.upload.path.split("public\\img\\userImages\\")[1];
//     // return res.status(200).json({
//     //   uploaded: true,
//     //   url: fileName,
//     // });
//   });
// };
