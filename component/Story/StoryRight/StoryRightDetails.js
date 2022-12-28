import React from "react";
import Link from "next/link";
import ReactHtmlParser from "react-html-parser";

const StoryRightDetails = ({ story }) => {
  const { story_id, title, body, username, user_id, community_title, short_story } = story;
  let finalBody = body
    .replace(/watch\?v=/g, "embed/")
    .replace(/youtu.be/g, "youtube.com/embed")
    .replace(
      /<oembed url/g,
      '<iframe allowfullscreen=""  width="100%" height="450px" src'
    )
    .replace(/oembed/g, "iframe")
    .replace("///", "'")
    .replace(/%comma%/g, "'");
  return (
    <div className="article-stories-box">
      <span>{community_title}</span>
      <Link
        href={
          "/story/" +
          story_id +
          "/" +
          title.replace(/\s/g, "-").substring(0, 60)
        }
      >
        <a>
          <h3>{title.substring(0, 60)}...</h3>
        </a>
      </Link>
      <br></br>
      <Link
        href={{
          pathname: `/user/[id]/[username]`,
          query: { id: user_id, username: username },
        }}
      >
        <a>
          <h4>{username}</h4>
        </a>
      </Link>
      <br></br>
      <p>{short_story && short_story}</p>
      <div className="text-center">
        <Link
          href={
            "/story/" +
            story_id +
            "/" +
            title.replace(/\s/g, "-").substring(0, 60)
          }
        >
          <a>Read more</a>
        </Link>
      </div>
    </div>
  );
};

export default StoryRightDetails;
