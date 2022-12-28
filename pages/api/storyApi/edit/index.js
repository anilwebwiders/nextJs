/* eslint-disable import/no-anonymous-default-export */
import auth from "../../../../component/middleware/middleware";
import db from "../../../../utils/connectDB";
import { changeText } from "../../../../utils/replace";

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await storyPost(req, res);
      break;
  }
};

const storyPost = async (req, res) => {
  const authData = await auth(req, res);
  
  if (authData.validated) {
    let { title, communityId, summary, body, tags, image, story_id } = await req.body;
    title = changeText(title)
    summary ? changeText(summary) : 'null';
    body = changeText(body),
    tags = changeText(tags.toString()),
    tags ? tags : 'null';
      const sqlPost= `UPDATE fnmotivation.stories t SET t.title = '${title}', t.short_story = '${summary}', t.community_id = '${communityId}', t.post_thumbnail= '${image}',  t.body = '${body}',  t.tags = '${tags.toString()}' WHERE t.story_id = '${story_id}'`;
      db.query(sqlPost,  (err, documents) => {
        if (err) res.status(500).json({err: err.message})
        res.send({success: 'Updated Successfully'});
      });
  }
};
