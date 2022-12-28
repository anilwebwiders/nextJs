/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";
import { notifyError, notifySuccess } from "../../../../store/notify/action";
import { deleteData } from "../../../../utils/api-client";
import Paginate from "../../../Paginate/Paginate";

const UserArticleSearch = ({ search, count, setSearchPage }) => {
  const [delLoad, setDelLoad] = useState(null);
  const deleteArticle = async (id) => {
    setDelLoad(id);
    const data = await deleteData(
      `userApi/page/article?article_id=${id}`,
      auth.token
    );
    setDelLoad(null);
    getUsersActivity();
    if (data.err) return dispatch(notifyError(data.err));
    if (data.success) return dispatch(notifySuccess("Deleted Successfully"));
  };
  const pageCount = Math.ceil(count / 12);
  const fetchData = (page) => {
    setSearchPage(page.selected + 1);
  };
  return (
    <>
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
            {search.map((article) => (
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
                  {delLoad === article.article_id ? (
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
      </div>
      <Paginate pageCount={pageCount} fetchData={fetchData} />
    </>
  );
};

export default UserArticleSearch;
