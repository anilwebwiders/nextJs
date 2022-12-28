/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { notifyError, notifySuccess } from "../../../../store/notify/action";
import { deleteData, getFetchData } from "../../../../utils/api-client";
import Preloader from "../../../Preloader/Preloader";

const GuestArticle = ({ user }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const handleShow = () => {
    setPage(page + 12);
  };
  const [load, setLoad] = useState(true);
  const [article, setArticle] = useState([]);
  const getUsersActivity = useCallback(async () => {
    setLoad(true);
    const articleData = await getFetchData(
      `userApi/page/article?user_id=${user.user_id}&show=${page}`
    );
    setArticle([...article, ...articleData]);
    setLoad(false);
  }, [page]);

  useEffect(() => {
    getUsersActivity();
  }, [getUsersActivity]);

  return (
    <>
      <div className="profile-posts-view">
        <form>
          <input
            type="text"
            className="form-control"
            placeholder="Search Articles"
          />
          <a>
            <img src="/search-icon.svg" alt="searchicon" />
          </a>
        </form>
        <Link href="/articles">
          <a className="view-all">View all Articles</a>
        </Link>
      </div>
      <div className="profile-posts-inner">
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>
                  Category <img src="/double-arrow.svg" alt="" />
                </th>
                <th>
                  Date <img src="/double-arrow.svg" alt="" />
                </th>
              
              </tr>
            </thead>
            <tbody>
              {article.map((article) => (
                <tr key={article.article_id}>
                  <Link href={"/article/" + article.article_id}>
                    <a>
                      <td>
                        <p>{article.title.substring(0, 60)}...</p>
                      </td>
                    </a>
                  </Link>
                  <td>{article.community_title}</td>
                  <td>
                    {moment(article.created_at.split("T")[0]).format(
                      "MM/DD/YY"
                    )}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
          <h4
            className="text-warning text-center p-5"
            style={{ cursor: "pointer" }}
            onClick={handleShow}
          >
            {load ? <Preloader /> : "Show More"}
          </h4>
        </div>
      </div>
    </>
  );
};

export default GuestArticle;
