/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { getFetchData } from "../../../../utils/api-client";
import Preloader from "../../../Preloader/Preloader";
import UserArticleSearch from "./UserArticleSearch";
import DeleteModal from "../../../Modal/Delete/DeleteModal";

const UserArticle = ({ auth }) => {
  const [page, setPage] = useState(0);
  const handleShow = () => {
    setPage(page + 12);
  };
  const [load, setLoad] = useState(true);
  const [article, setArticle] = useState([]);
  const getUsersActivity = useCallback(async () => {
    setLoad(true);
    const articleData = await getFetchData(
      `userApi/page/article?user_id=${auth.user.user_id}&show=${page}`,
      auth.token
    );
    setArticle([...article, ...articleData]);
    setLoad(false);
  }, [auth, page]);

  useEffect(() => {
    getUsersActivity();
  }, [getUsersActivity]);

  //Delete
  const [modalDelete, setModalDelete] = useState(false);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState(null);
  const toggleDelete = (id, data) => {
    setModalDelete(!modalDelete);
    setId(id);
    setTitle(data);
  };
  //Search
  const [search, setSearch] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [count, setCount] = useState([]);
  const [searchPage, setSearchPage] = useState(0);
  const handleSearch = async (e) => {
    setSearchTxt(e.target.value);
  };
  const getSearch = useCallback(async () => {
    setLoad(true);
    const articleData = await getFetchData(
      `userApi/page/article/search?user_id=${auth.user.user_id}&search=${searchTxt}&show=${searchPage}`
    );
    setCount(articleData.count);
    setSearch(articleData.data);
    setLoad(false);
  }, [searchTxt, searchPage]);
  useEffect(() => {
    getSearch();
  }, [getSearch]);
  console.log('article', article)
  return (
    <>
      <DeleteModal
        toggleDelete={toggleDelete}
        modalDelete={modalDelete}
        auth={auth}
        title={title}
        type={"article"}
        url={`userApi/page/article?article_id=${id}`}
        redirect={getUsersActivity}
      />
      <div className="profile-posts-view">
        <Link href="/">
          <a className="view-all">{article.length} Articles Posted</a>
        </Link>
        <div className="profile-search">
          <div className="select-box"><select className="dropdownpost-profile">
            <option>Sort by</option>
          </select>
          </div>
          <form>
            <input
              type="text"
              className="form-control"
              placeholder=""
              onChange={handleSearch}
            />
            <a>
              <img src="/search-icon.svg" alt="searchicon" />
            </a>
          </form>
        </div>
      </div>
      <div className="profile-posts-inner">
        {searchTxt.length === 0 ? (
         
          <div className="table-border-radius">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Post Title</th>
                    <th>Category</th>
                    {/*<th>Source</th>*/}
                    <th>Date</th>
                    <th><div className="group-btn">Action</div></th>
                  </tr>
                </thead>
                <tbody>
                  {article.map((article) => (
                    <tr>
                      <td>{article.title.substring(0, 60)}...</td>
                      <td>{article.community_title}</td>
                      {/*<td>Psycom</td>*/}
                      <td>{moment(article.created_at.split("T")[0]).format(
                        "MM/DD/YY"
                      )}</td>
                      <td>
                        <div className="group-btn">
                          <Link href={"/article/" + article.article_id}>
                            <img src="/action1.png" alt="" />
                          </Link>
                          <a
                            style={{ cursor: "pointer" }}
                            className="delet-btn"
                            onClick={() => toggleDelete(article.article_id, article.title)}
                          ><a href="#"><img src="/action3.png" alt="" /></a></a>



                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {article.length > 12 && (
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
        ) : (
          <UserArticleSearch
            search={search}
            count={count}
            setSearchPage={setSearchPage}
          />
        )}
      </div>
      {/*<div className="d-flex justify-content-center p-5"><ul className="pagination"><li className="page-item disabled"><a className="page-link" tabindex="0" role="button" aria-disabled="true" aria-label="Previous page" rel="prev">&lt;</a></li><li className="page-item active"><a role="button" className="page-link" tabindex="0" aria-label="Page 1 is your current page" aria-current="page">1</a></li><li className="page-item"><a role="button" className="page-link" tabindex="0" aria-label="Page 2">2</a></li><li className="page-item"><a role="button" className="page-link" tabindex="0" aria-label="Page 3">3</a></li><li className="page-item"><a role="button" className="page-link" tabindex="0" aria-label="Page 4">4</a></li><li className="page-item"><a role="button" className="page-link" tabindex="0" aria-label="Page 5">5</a></li><li className="page-item"><a className="page-link" tabindex="0" role="button" aria-disabled="false" aria-label="Next page" rel="next">&gt;</a></li></ul></div> */}
    </>

  );
};

export default UserArticle;
