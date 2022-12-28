/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Link from "next/link";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import StoryComments from "./StoryComments/StoryComments";
import RelatedStory from "./RelatedStory";
import StoryShareModal from "./StoryDetialsElem/StoryShareModal";
import StoryLikes from "./StoryDetialsElem/StoryLikes";
import StoryBookMark from "./StoryDetialsElem/StoryBookMark";
import Follow from "./StoryDetialsElem/Follow";
import { useSelector } from "react-redux";
import ReportStory from "./ReportStory/ReportStory";
import ReactPlayer from "react-player";
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from "react-icons/ai";
import ShowFiles from "./ShowFiles";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const StoryDetails = ({ story }) => {
  const {
    story_id,
    title,
    community_id,
    body,
    user_id,
    created_at,
    username,
    avatar,
    tags,
    community_title,
    total_likes,
    files,
  } = story;
  const auth = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  //Body
  let finalBody = body
    .replace(/watch\?v=/g, "embed/")
    .replace(/youtu.be/g, "youtube.com/embed")
    .replace(
      /<oembed url/g,
      '<iframe allowfullscreen=""  width="854px" height="480px" src'
    )
    .replace(/oembed/g, "iframe")
    .replace("///", "'")
    .replace(/%comma%/g, "'");
  return (
    
    <div>

      <div className="breadcrumb-main">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link
              href={
                "/communities/story/" +
                community_id +
                "/" +
                community_title.replace(/\s/g, "-")
              }
            >
              <a>{community_title}</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">
            {title.replace(/%comma%/g, "'").substring(0, 60)}...
          </li>
        </ol>
      </div>
      <div className="article-blog">
        <div className="text-box">
          {/* {auth.user.user_id && (
            <ReportStory story_id={story_id} user_id={user_id} title={title} />
          )} */}
          
          {/* body */}
          <div>
            <div className="row my-4"> 
            <Carousel autoPlay>
              {files.map((i) => {
                return (
                 
                      <div>
                          <>
                          {i.content_type == 1 ? (
                            <div className="my-2">
                              <img src={i?.content_link} alt="storyImage" />
                            </div>
                          ) : (
                            <ShowFiles i={i?.content_link} />
                          )}
                        </>
                      </div>
                      
                  
                  
                );
              })}
              </Carousel>
            </div>

          </div>
          <div className="article-title">
            <div className="article-title-left">
              {/* <h2>{title}</h2>
              <Link
            href={
              "/communities/story/" +
              community_id +
              "/" +
              community_title.replace(/\s/g, "-")
            }
          >
            <span style={{ cursor: "pointer" }}>{community_title}</span>
          </Link>
              <p>{moment(created_at.split("T")[0]).format("MM/DD/YY")}</p> */}
              <div className="article-title-user">
                <div className="user-holder">
                  <img src={avatar} alt="user" className={`image-Short`} />
                </div>
                <div className="text-inner">
                  <Link
                    href={{
                      pathname: `/user/[id]/[username]`,
                      query: { id: user_id, username: username },
                    }}
                  >
                    <a>
                    <h2>aebrown</h2>
                      <h3>{username}</h3>
                    </a>
                  </Link>
                  {auth.user.user_id && <Follow id={user_id} auth={auth} />}
                </div>
              </div>
            </div>
            {/* Like Share */}
            {auth.user.user_id && (
              <div className="article-title-right">
                <ul>
                  <li>
                    <a onClick={toggle}>
                      <img
                        src="/share-icon.svg"
                        className="simple-state"
                        alt=""
                      />
                      <img
                        src="/share-hover.svg"
                        className="hover-state"
                        alt=""
                      />
                    </a>
                    {open && (
                      <StoryShareModal
                        open={open}
                        toggle={toggle}
                        title={title}
                        story_id={story_id}
                      />
                    )}
                  </li>
                  <StoryLikes
                    story_id={story_id}
                    total_likes={total_likes}
                    auth={auth}
                  />
                  <StoryBookMark story_id={story_id} auth={auth} />
                </ul>
              </div>
            )}
          </div>
          {/* Mobile */}
          {auth.user.user_id && (
            <div className="article-title-right mobile-version">
              <ul>
                <li>
                  <a onClick={toggle}>
                    <img
                      src="/share-icon.svg"
                      className="simple-state"
                      alt=""
                    />{" "}
                    <img
                      src="/share-hover.svg"
                      className="hover-state"
                      alt=""
                    />
                  </a>
                </li>
                <StoryLikes
                  story_id={story_id}
                  total_likes={total_likes}
                  auth={auth}
                />
                <StoryBookMark story_id={story_id} auth={auth} />
              </ul>
            </div>
          )}
        </div>
        <div className="article-title-left">
              <h2>{title}</h2>
              <Link
            href={
              "/communities/story/" +
              community_id +
              "/" +
              community_title.replace(/\s/g, "-")
            }
          >
            <div className="d-flex align-items-center">
              <span style={{ cursor: "pointer" }}>{community_title}</span>
              <p>{moment(created_at.split("T")[0]).format("MM/DD/YY")}</p>
          </div>
          </Link>
          
        </div>      
        <div className="story-page-text">
            <div className="storyBody">
              {/* {story.body.split('\n').map((str, index) => <p key={index}>{str}</p>)} */}
              <div>{finalBody.split('\n').map((str, index) => <p key={index}>{str}</p>)}</div>
            </div>
          </div>
        {/* Tags */}
        <div className="tag-box post-tag">
            <h2>Tags</h2>
            {tags && (
              <>
                <ul>
                  {tags.split(",").map((str, index) => (
                    <li key={index}>
                      <Link href={"/tag/" + str.replace("#", "")}>
                        <a>{str}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        {/* Comments */}
        <StoryComments story_id={story_id} />
       
      </div> 
      </div>
  );
};

export default StoryDetails;
