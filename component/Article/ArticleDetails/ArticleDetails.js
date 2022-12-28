/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import moment from "moment";
import Link from "next/link";
import ArticleLike from "./ArticleDetailsElm/ArticleLike";
import ArticleBookMark from "./ArticleDetailsElm/ArticleBookMark";
import ArticleComment from "./ArticleComment/ArticleComment";
import ArticleShareModal from "./ArticleDetailsElm/ArticleShareModal";
import Follow from "../../Story/StoryDetails/StoryDetialsElem/Follow";
import { useSelector } from "react-redux";
import ReportArticle from "./ReportArticle/ReportArticle";
const ArticleDetails = ({ article }) => {
  const {
    article_id,
    title,
    avatar,
    redirect_link,
    source_text,
    img_link,
    description,
    community_id,
    community_title,
    created_at,
    user_id,
    full_name,
    username,
    email,
  } = article;
  const auth = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <div className="article-left">
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
                "/communities/article/" +
                community_id +
                "/" +
                community_title.replace(/\s/g, "-")
              }
            >
              <a>{community_title}</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">
            {title.substring(0, 60)}...
          </li>
        </ol>
      </div>

      <div className="article-blog pt-3 artical_details">
        <div className="text-box">
          {auth.user.user_id && (
            <ReportArticle
              article_id={article_id}
              title={title}
              user_id={user_id}
            />
          )}
          {/* <Link
            href={
              "/communities/article/" +
              community_id +
              "/" +
              community_title.replace(/\s/g, "-")
            }
          >
            <span style={{cursor: "pointer" }}>{community_title}</span>
          </Link> */}

          <div className="article-title">
            <div className="article-title-left">
              {/* <h2>{title}</h2> */}
              {/* <p>{moment(created_at.split("T")[0]).format("MM/DD/YY")}</p> */}
              <div className="article-title-user">
                <div className="user-holder">
                  <img src={avatar} alt="user" className={`image-Short`} />
                </div>
                <div className="text-inner">
                  <Link
                    href={{
                      pathname: `/user/[id]/[username]`,
                      query: {
                        id: user_id,
                        username: username,
                      },
                    }}
                  >
                    <a>
                      <h2>Saimon Jhonson</h2>
                      <h3>{username}</h3>
                    </a>
                  </Link>
                  {auth.user.user_id && <Follow id={user_id} />}
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
                      <ArticleShareModal
                        open={open}
                        toggle={toggle}
                        url={`${process.env.BASE_URL}/article/${article_id}`}
                        title={title}
                      />
                    )}
                  </li>
                  <ArticleLike article_id={article_id} auth={auth} />
                  <ArticleBookMark article_id={article_id} auth={auth} />
                </ul>
              </div>
            )}
          </div>

          {/* Main Article */}
          <div className="image-holder">
            <div className="text-center article-img">
            <img src={img_link} alt="articleImage" className="img-fluid" />
            </div>
            
            <h2>{title}</h2>
            <div className="d-flex align-items-center">
            <Link
            href={
              "/communities/article/" +
              community_id +
              "/" +
              community_title.replace(/\s/g, "-")
            }
          >
            <span style={{cursor: "pointer" }}>{community_title}</span>
          </Link>
            <p>{moment(created_at.split("T")[0]).format("MM/DD/YY")}</p>
            </div>
            <p className="mt-3">{description}</p>
            <a target="_blank" rel="noopener noreferrer" href={redirect_link}><small>Source:-</small>
              {redirect_link}
            </a>
          </div>

          {/* Like Share Mobile*/}
          {auth.user.user_id && (
            <div className="article-title-right mobile-version">
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
                </li>
                <ArticleLike article_id={article_id} auth={auth} />
                <ArticleBookMark article_id={article_id} auth={auth} />
              </ul>
            </div>
          )}
          {/* Comment */}
          <ArticleComment article_id={article_id} />
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
