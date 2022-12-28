/* eslint-disable import/no-anonymous-default-export */
import auth from "../../../../component/middleware/middleware";
import db from "../../../../utils/connectDB";
import emailStory from "../../../../utils/emailTemplates/story-published.html";
import awsTransporter from "../../../../utils/awsTransporter";
import { validPostStory } from "../../../../component/middleware/valid";
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await storyPost(req, res);
      break;
  }
};

const storyPost = async (req, res) => {
  const authData = await auth(req, res);

  if (authData.validated) {
    let {
      title,
      communityId,
      summary,
      body,
      tags,
      image,
      user_id,
      email,
      name,
      file
    } = req.body;

    image ? image : "null";
    summary ? summary : "null";
    tags ? tags : "null";

    console.log(req.body);

    const error = validPostStory({
      title,
      communityId,
      summary,
      body,
      tags,
      image,
      user_id,
      email,
      name,
      file
    });

    if (error.message.length > 0) return res.status(400).json(error);

    const sqlSelect = `INSERT INTO stories (title, community_id, short_story, body, post_thumbnail, tags, user_id) values(?,?,?,?,?,?,?)`;

    db.query(
      sqlSelect,
      [
        title,
        communityId,
        summary?.substring(0, 70),
        body,
        image,
        tags?.toString(),
        user_id,
      ],
      async (err, documents) => {
        console.log(err);
        if (err)
          return res.status(500).json({
            success: false,
            message: ["Database Error"],
            error_code: 1106,
            data: {},
          });

        if (file?.length > 0) {
          //File Upload
          file.map(async (i, idx) => {
            console.log(i);

            const postFiles = `INSERT INTO story_contents (story_id, content_type, content_link) values(?,?,?)`;
            db.query(
              postFiles,
              [documents.insertId, i.type, i.Location],
              (err, imagePosted) => {
                console.log(err);
                if (err)
                  return res.status(500).json({
                    success: false,
                    message: ["Can't  upload file right now"],
                    error_code: 1200,
                    data: {},
                  });

                if (idx == file.length - 1) {
                  console.log("go");
                  const sqlEmail = `SELECT story_post FROM email_notification_settings WHERE user_id = ${user_id}`;
                  db.query(sqlEmail, (err, postEmail) => {
                    if (postEmail[0].story_post == 1) {
                      let emailTemp = emailStory
                        .replace("[personName]", name)
                        .replace("[textType]", "story")
                        .replace(
                          "[url]",
                          `https://www.fnmotivation.com/story/${
                            documents.insertId
                          }/${title.substring(0, 60).replace(/\s/g, "-")}`
                        )
                        .replace("[post]", title);

                      const mailOptions = {
                        from: process.env.EM_USER,
                        to: email,
                        subject: "FNMotivation Story posted successfully",
                        html: emailTemp,
                      };

                      awsTransporter.sendMail(
                        mailOptions,
                        function (err, response) {
                          if (err) {
                            console.log(err);
                          } else {
                          }
                        }
                      );
                    }
                  });
                  return res.status(201).json({
                    success: true,
                    message: ["Story Posted Successfully"],
                    data: {
                      redirect: `/story/${documents.insertId}/${title
                        .substring(0, 60)
                        .replace(/\s/g, "-")}`,
                      story_id: documents.insertId,
                    },
                  });
                }
              }
            );

            //Post Image End
          });
        } else {
          const sqlEmail = `SELECT story_post FROM email_notification_settings WHERE user_id = ${user_id}`;
          db.query(sqlEmail, (err, postEmail) => {
            if (postEmail[0].story_post == 1) {
              let emailTemp = emailStory
                .replace("[personName]", name)
                .replace("[textType]", "story")
                .replace(
                  "[url]",
                  `https://www.fnmotivation.com/story/${
                    documents.insertId
                  }/${title.substring(0, 60).replace(/\s/g, "-")}`
                )
                .replace("[post]", title);

              const mailOptions = {
                from: process.env.EM_USER,
                to: email,
                subject: "FNMotivation Story posted successfully",
                html: emailTemp,
              };

              awsTransporter.sendMail(mailOptions, function (err, response) {
                if (err) {
                  console.log(err);
                } else {
                }
              });
            }
          });
          return res.status(201).json({
            success: true,
            message: ["Story Posted Successfully"],
            data: {
              redirect: `/story/${documents.insertId}/${title
                .substring(0, 60)
                .replace(/\s/g, "-")}`,
              story_id: documents.insertId,
            },
          });
        }
      }
    );
  }
};
