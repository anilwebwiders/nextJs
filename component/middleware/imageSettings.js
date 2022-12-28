const fs = require("fs");
const AWS = require("aws-sdk");
import { generateName } from "../../utils/generateName";

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_UPLOAD_KEY,
  secretAccessKey: process.env.S3_UPLOAD_SECRET,
});

export const imageSettings = async (file) => {
  const data = fs.readFileSync(file);
  const name = await generateName();

  const image = await sharp(data)
    .resize(854, 480, {
      fit: "cover",
      position: "center",
    })
    .toBuffer();

  // Setting up S3 upload parameters
  const params = {
    Bucket: process.env.S3_UPLOAD_BUCKET,
    Key: `${name}${file.name}`, // File name you want to save as in S3
    Body: image,
  };

  // Uploading files to the bucket
  s3.upload(params, function (err, data) {
    if (err) {
      res.status(500).json({ err: "Can not upload image try again!" });
      throw err;
    }
    console.log(data);
    return data;
  });
};
