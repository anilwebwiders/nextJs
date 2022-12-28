/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import FollowingStory from "../AllStories/FollowingStory";
import PopularStory from "../AllStories/PopularStory";
import RecentStory from "../AllStories/RecentStory";
import SubscribedStory from "../AllStories/SubscribedStory";
const CommunityStory = ({ storyPage, fetchData }) => {
  const auth = useSelector((state) => state.auth);

  const router = useRouter();
  const { title, id } = router.query;
  const [set, sSet] = useState(true);
  const [r, setR] = useState("/#pills-recent");

  const changeR = (data) => {
    setR(data);
    sSet(false);
  };

  return (
    <div>
      <h3>Community: {title.replace("-", " ")}</h3>
      <Link href="/post-story">
        <a>
          <button className="main-btn my-2">Post Story</button>
        </a>
      </Link>
      <div className="article-left">
        <div className="pre-login-inner">
          <div className="pre-login-sort">
            <div className="mt-5">
              <ul className="nav nav-pills">
                <li className="nav-item">
                  <a
                    className={
                      set
                        ? "nav-link active"
                        : r === "#pills-recent"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    onClick={() => changeR("#pills-recent")}
                  >
                    Recent
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={
                      r === "#pills-popular" ? "nav-link active" : "nav-link"
                    }
                    onClick={() => changeR("#pills-popular")}
                  >
                    Popular
                  </a>
                </li>
                {auth.user.username ? (
                  <>
                    <li className="nav-item">
                      <a
                        className={
                          r === "#pills-categories"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        onClick={() => changeR("#pills-categories")}
                      >
                        Subscribed
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={
                          r === "#pills-following"
                            ? "nav-link active"
                            : "nav-link"
                        }
                        onClick={() => changeR("#pills-following")}
                      >
                        Following
                      </a>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <a href="/login" className="nav-link">
                        Subscribed
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/login" className="nav-link">
                        Following
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Pages to Show */}
            <div className="tab-content" id="pills-tabContent">
              <div
                className={
                  set
                    ? "nav-link active"
                    : r === "#pills-recent"
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
              >
                <RecentStory
                  type={id}
                  fetchData={fetchData}
                  storyPage={storyPage}
                />
              </div>
              <div
                className={
                  r === "#pills-popular"
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
              >
                <PopularStory
                  type={id}
                  fetchData={fetchData}
                  storyPage={storyPage}
                />
              </div>

              <div
                className={
                  r === "#pills-categories"
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
              >
                <SubscribedStory
                  type={id}
                  fetchData={fetchData}
                  storyPage={storyPage}
                  auth={auth}
                />
              </div>

              <div
                className={
                  r === "#pills-following"
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
              >
                <FollowingStory
                  type={id}
                  fetchData={fetchData}
                  storyPage={storyPage}
                  auth={auth}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityStory;
