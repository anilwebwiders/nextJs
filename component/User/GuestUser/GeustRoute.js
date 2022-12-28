import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAll, getFetchData } from "../../../utils/api-client";
import GuestArticle from "./GuestArticle/GuestArticle";
import GuestStory from "./GuestStory/GuestStory";
import GuestFav from "./GuestFav/GuestFav";
import GuestFollowers from "./GuestFollowers/GuestFollowers";
import GuestFollowing from "./GuestFollowing/GuestFollowing";

const GuestRoute = ({ user, getFollow, follow }) => {
  const auth = useSelector((state) => state.auth);
  const [set, sSet] = useState(false);
  const [r, setR] = useState("#pills-story");
  const changeR = (data) => {
    setR(data);
    sSet(false);
  };
  const [storyCount, setStoryCount] = useState([]);
  const [articleCount, setArticleCount] = useState([]);
  const [bookMarkCount, setBookMarkCount] = useState([]);
  const [followersCount, setFollowersCount] = useState([]);
  const [followingCount, setFollowingCount] = useState([]);
  const getActivityCount = useCallback(async () => {
    //Story
    const count = await getFetchData(
      `userApi/page/count?user_id=${user.user_id}`,
      auth.token
    );

    setStoryCount(count.story[0].story);
    setArticleCount(count.article[0].article);
    setBookMarkCount(count.sBook[0].sBook + count.aBook[0].aBook);
    setFollowersCount(count.following[0].my_followers);
    setFollowingCount(count.followers[0].I_am_following);
  }, [auth, follow]);
  useEffect(() => {
    getActivityCount();
  }, [getActivityCount]);
  return (
    <>
      <div className="profile-posts">
        <div className="table-responsive">
          <ul className="nav nav-pills" id="pills-tab" role="tablist">
            <li className="nav-item">
              <a
                className={
                  set
                    ? "nav-link active"
                    : r === "#pills-story"
                    ? "nav-link active"
                    : "nav-link"
                }
                onClick={() => changeR("#pills-story")}
              >
                <span>{storyCount}</span> Story Posts
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  set
                    ? "nav-link active"
                    : r === "#pills-articles"
                    ? "nav-link active"
                    : "nav-link"
                }
                onClick={() => changeR("#pills-articles")}
              >
                <span>{articleCount}</span> Articles
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  set
                    ? "nav-link active"
                    : r === "#pills-fav"
                    ? "nav-link active"
                    : "nav-link"
                }
                onClick={() => changeR("#pills-fav")}
              >
                <span>{bookMarkCount}</span> Favorites
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  set
                    ? "nav-link active"
                    : r === "#pills-follow"
                    ? "nav-link active"
                    : "nav-link"
                }
                onClick={() => changeR("#pills-follow")}
              >
                <span>{followersCount}</span> Followers
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  set
                    ? "nav-link active"
                    : r === "#pills-following"
                    ? "nav-link active"
                    : "nav-link"
                }
                onClick={() => changeR("#pills-following")}
              >
                <span>{followingCount}</span> Following
              </a>
            </li>
          </ul>
        </div>

        <div className="tab-content" id="pills-tabContent">
          <div
            className={
              set
                ? "nav-link active"
                : r === "#pills-story"
                ? "tab-pane fade show active"
                : "tab-pane fade"
            }
          >
            <div className="profile-posts-inner">
              <GuestStory user={user} />
            </div>
          </div>
          <div
            className={
              set
                ? "nav-link active"
                : r === "#pills-articles"
                ? "tab-pane fade show active"
                : "tab-pane fade"
            }
          >
            <div className="profile-posts-inner">
              <GuestArticle user={user} />
            </div>
          </div>
          <div
            className={
              set
                ? "nav-link active"
                : r === "#pills-fav"
                ? "tab-pane fade show active"
                : "tab-pane fade"
            }
          >
            <GuestFav user={user} />
          </div>
          <div
            className={
              set
                ? "nav-link active"
                : r === "#pills-follow"
                ? "tab-pane fade show active"
                : "tab-pane fade"
            }
          >
            <GuestFollowers user={user} getFollow={getFollow} />
          </div>
          <div
            className={
              set
                ? "nav-link active"
                : r === "#pills-following"
                ? "tab-pane fade show active"
                : "tab-pane fade"
            }
          >
            <GuestFollowing user={user} getFollow={getFollow} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GuestRoute;
