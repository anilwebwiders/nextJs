/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
import { getFetchData, postData } from "../../../../utils/api-client";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../../../Preloader/Preloader";
import { notifyError, notifySuccess } from "../../../../store/notify/action";

const UserArticleFav = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [page, setPage] = useState(0);
  const handleShow = () => {
    setPage(page + 12);
  };
  const [load, setLoad] = useState(true);
  const [article, setArticle] = useState([]);
  const getUsersActivity = useCallback(async () => {
    setLoad(true);
    const articleData = await getFetchData(
      `userApi/page/articleBookMark?user_id=${auth.user.user_id}&show=${page}`,
      auth.token
    );
    setArticle([...article, ...articleData]);
    setLoad(false);
  }, [auth, page]);

  useEffect(() => {
    getUsersActivity();
  }, [getUsersActivity]);
  const [delLoad, setDelLoad] = useState(null);
  const deleteArticle = async (id) => {
    setDelLoad(id);
    const data = await postData(
      `userApi/page/articleBookMark`,
      { article_id: id, user_id: auth.user.user_id },
      auth.token
    );
    setDelLoad(null);
    getUsersActivity();
    if (data.err) return dispatch(notifyError(data.err));
    if (data.success) return dispatch(notifySuccess("Deleted Successfully"));
  };
  return (
    <>
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
                <th>Action</th>
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
                  <td>
                    {delLoad == article.article_id ? (
                      <p>...Loading...</p>
                    ) : (
                      <ul>
                        <li>
                          <a
                            style={{ cursor: "pointer" }}
                            className="delet-btn"
                            onClick={() => deleteArticle(article.article_id)}
                          >
                            Delete
                          </a>
                        </li>
                      </ul>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {article.length >= 12 && (
          <h4
            className="text-warning text-center p-5"
            style={{ cursor: "pointer" }}
            onClick={handleShow}
          >
            {load ? <Preloader /> : "Show More"}
          </h4>
           )}
        </div>
      </div>
    </>
  );
};

export default UserArticleFav;
