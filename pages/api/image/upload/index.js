import nextConnect from "next-connect";
import multer from "multer";
import sharp from "sharp";
const AWS = require("aws-sdk");

import momentTime from "moment-timezone";

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.log(error);
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method "${req.method}" Not Allowed` });
  },
});

apiRoute.use(multer().any());

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_UPLOAD_KEY,
  secretAccessKey: process.env.S3_UPLOAD_SECRET,
});
let date = momentTime.tz(new Date(), "Asia/Dhaka").format();
const filterDate = date.split("T")[0];

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const imageResize = async (i) => {
  return await sharp(i)
    .resize(854, 480, {
      fit: "cover",
      position: "center",
    })
    .toBuffer();
};
apiRoute.post(async (req, res) => {
  let i = req.files[0];
  console.log(i);

  if (!i) return;

  if (i) {
    //File Upload

    const params = {
      Bucket: process.env.S3_UPLOAD_BUCKET,
      Key: `${makeid(50)}${filterDate}${i.originalname}`, // File name you want to save as in S3
      Body: i.mimetype.includes("image")
        ? await imageResize(i.buffer)
        : i.buffer,
    };

    // Uploading files to the bucket

    s3.upload(params, function (err, data) {
      console.log(err);
      if (err) {
        res.status(500).json({ err: "Can not upload image try again!" });
        throw err;
      }
      //Post Image

      return res.status(201).json({
        success: true,
        message: ["Image Uploaded Successfully"],
        fileLinks: { ...data, type: i.mimetype.includes("image") ? 1 : 2 },
      });
    });

    //Post Image End
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
