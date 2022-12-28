/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import FollowingArticle from "./FollowingArticles";
import PopularArticle from "./PopularArticle";
import RecentArticle from "./RecentArticle";
import SucscribedArticle from "./SubscribedAricle";
const AllArticle = ({articlePage, fetchData, changeType, type}) => {

  const auth = useSelector((state) => state.auth);
  const [set, sSet] = useState(true);
  const [r, setR] = useState("/#pills-recent");


  const changeR = (data) => {
    setR(data);
    sSet(false);
  };


  return (
    <div className="article-left">
      <h1 className="text-center">ARTICLE</h1>
      <div className="pre-login-inner mt-3">
        <div className="pre-login-sort">
         <div className="login-sort">
         <select
            className="form-control"
            name="category"
            onChange={changeType}
          >
            <option value="0">Select Community</option>
            <option value="3">Eating Disorder</option>
            <option value="4">Weight Issues</option>
            <option value="5">Heart Diseases</option>
            <option value="6">Anxiety</option>
            <option value="7">Depression</option>
            <option value="1">Drug Addiction</option>
            <option value="8">Insecurity</option>
            <option value="9">Mental Health</option>
            <option value="10">Stress</option>
            <option value="2">Alchohol Addiction</option>
            <option value="11">Smoking</option>
          </select>

          <div className="nav_item">
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
                      <a href="/login" className="nav-link">Subscribed</a>
                  </li>
                  <li className="nav-item">
                      <a href="/login" className="nav-link">Following</a>
                  </li>
                </>
              )}
            </ul>
          </div>
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
              <RecentArticle
                type={type}
                fetchData={fetchData}
                articlePage={articlePage}
              />
            </div>
            <div
              className={
                r === "#pills-popular"
                  ? "tab-pane fade show active"
                  : "tab-pane fade"
              }
            >
              <PopularArticle
                type={type}
                fetchData={fetchData}
                articlePage={articlePage}
              />
            </div>

            <div
              className={
                r === "#pills-categories"
                  ? "tab-pane fade show active"
                  : "tab-pane fade"
              }
            >
              <SucscribedArticle
                type={type}
                fetchData={fetchData}
                articlePage={articlePage}
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
               <FollowingArticle
                type={type}
                fetchData={fetchData}
                articlePage={articlePage}
                auth={auth}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllArticle;
