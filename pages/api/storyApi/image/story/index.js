/* eslint-disable import/no-anonymous-default-export */
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = "./public/img/storyImages";
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err)
      return res
        .status(500)
        .json({ err: "Error occured can not upload the file." });
    const fileName = files.upload.path.split("public\\img\\storyImages\\")[1];
    return res.status(200).json({
      uploaded: true,
      url: fileName,
    });
  });
};
