/* eslint-disable import/no-anonymous-default-export */

const AWS = require("aws-sdk");

export default async (req, res) => {
  switch (req.method) {
    case "DELETE":
      await deletePhoto(req, res);
      break;
  }
};

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_UPLOAD_KEY,
  secretAccessKey: process.env.S3_UPLOAD_SECRET,
});

const deletePhoto = async (req, res) => {
  const key = req.query.img.split("https://fnm-uploads.s3.amazonaws.com/")[1];

  var params = {
    Bucket: process.env.S3_UPLOAD_BUCKET,
    Key: key,
  };
  try {
    s3.deleteObject(params, function (err, data) {
      if (err) throw err;
    }).promise();
  } catch (e) {
    console.log(e);
  }
};
