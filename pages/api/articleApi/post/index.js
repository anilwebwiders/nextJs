/* eslint-disable import/no-anonymous-default-export */
import auth from "../../../../component/middleware/middleware";
import db from "../../../../utils/connectDB";
import emailTemplate from "../../../../utils/emailTemplates/story-published.html";
const metascraper = require("metascraper")([
  require("metascraper-description")(),
  require("metascraper-image")(),
  require("metascraper-title")(),
  require("metascraper-url")(),
]);
import got from "got";
import awsTransporter from "../../../../utils/awsTransporter";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await articleGet(req, res);
      break;
    case "POST":
      await articlePost(req, res);
      break;
  }
};

const articleGet = async (req, res) => {
  const authData = await auth(req, res);
  if (authData.validated) {
    const { body: html, url } = await got(req.query.url);
    const metadata = await metascraper({ html, url });

    if (!metadata.description && !metadata.title) {
      res.status(500).json({ err: "Url have some missing fields, Can't post" });
    } else {
      let ogTitle = metadata.title;
      let ogUrl = url;
      let ogImage = metadata.image;
      let ogDescription = metadata.description;
      res.send({ ogTitle, ogUrl, ogImage, ogDescription });
    }
  }
};

const articlePost = async (req, res) => {
  const authData = await auth(req, res);

  if (authData.validated) {
    let {
      title,
      communityId,
      source_text,
      img_link,
      description,
      url,
      user_id,
      name,
      email,
    } = await req.body;

    const sqlSelect = `INSERT INTO articles (title, community_id, source_text, img_link, description, redirect_link, user_id) values(?,?,?,?,?,?, ?)`;
    db.query(
      sqlSelect,
      [title, communityId, source_text, img_link, description, url, user_id],
      (err, documents) => {
      if (err)
              return res.status(412).json({
                success: false,
                message: ['Database Error'],
                error_code: 1106,
                data: {},
              });

        // Email
        const sqlEmail = `SELECT article_post FROM email_notification_settings WHERE user_id = ${user_id}`;
        db.query(sqlEmail, (err, postEmail) => {
          if (postEmail[0].article_post == 1) {
            //Email
            let emailTemp = emailTemplate
              .replace("[textType]", "article post")
              .replace("[personName]", name)
              .replace("[post]", title)
              .replace(
                "[url]",
                `https://www.fnmotivation.com/article/${documents.insertId}`
              );
            const mailOptions = {
              from: process.env.EM_USER,
              to: email,
              subject: "FNMotivation Article posted successfully",
              html: emailTemp,
            };
            awsTransporter.sendMail(mailOptions, function (err, info) {
              if (err) return res.status(500).json({ err: err.message });
            });
          }
        });

        return res.status(201).json({
          success: true,
          message: ["Article Posted Successfully"],
          data: {
            redirect: `/article/${documents.insertId}`,
          },
          article_id: documents.insertId
        });
      }
    );
  }
};
