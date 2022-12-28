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
          <div class="select-box"><select class="dropdownpost-profile">
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
          // <div className="table">
          //   <table>
          //     <thead>
          //       <tr>
          //         <th>Title</th>
          //         <th>
          //           Category <img src="/double-arrow.svg" alt="" />
          //         </th>
          //         <th>
          //           Date <img src="/double-arrow.svg" alt="" />
          //         </th>
          //         <th>Action</th>
          //       </tr>
          //     </thead>
          //     <tbody>
          //       {article.map((article) => (
          //         <tr key={article.article_id}>
          //           <Link href={"/article/" + article.article_id}>
          //             <a>
          //               <td>
          //                 <p>{article.title.substring(0, 60)}...</p>
          //               </td>
          //             </a>
          //           </Link>
          //           <td>{article.community_title}</td>
          //           <td>
          //             {moment(article.created_at.split("T")[0]).format(
          //               "MM/DD/YY"
          //             )}
          //           </td>
          //           <td>
          //             <ul>
          //               <li>
          //                 <a
          //                   style={{ cursor: "pointer" }}
          //                   className="delet-btn"
          //                   onClick={() => toggleDelete(article.article_id, article.title)}
          //                 >
          //                   Delete
          //                 </a>
          //               </li>
          //             </ul>
          //           </td>
          //         </tr>
          //       ))}
          //     </tbody>
          //   </table>
          //   <h4
          //     className="text-warning text-center p-5"
          //     style={{ cursor: "pointer" }}
          //     onClick={handleShow}
          //   >
          //     {load ? <Preloader /> : "Show More"}
          //   </h4>
          // </div>
          <div class="table-border-radius">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Post Title</th>
                    <th>Category</th>
                    {/*<th>Source</th>*/}
                    <th>Date</th>
                    <th><div class="group-btn">Action</div></th>
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
                        <div class="group-btn">
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
      {/*<div class="d-flex justify-content-center p-5"><ul class="pagination"><li class="page-item disabled"><a class="page-link" tabindex="0" role="button" aria-disabled="true" aria-label="Previous page" rel="prev">&lt;</a></li><li class="page-item active"><a role="button" class="page-link" tabindex="0" aria-label="Page 1 is your current page" aria-current="page">1</a></li><li class="page-item"><a role="button" class="page-link" tabindex="0" aria-label="Page 2">2</a></li><li class="page-item"><a role="button" class="page-link" tabindex="0" aria-label="Page 3">3</a></li><li class="page-item"><a role="button" class="page-link" tabindex="0" aria-label="Page 4">4</a></li><li class="page-item"><a role="button" class="page-link" tabindex="0" aria-label="Page 5">5</a></li><li class="page-item"><a class="page-link" tabindex="0" role="button" aria-disabled="false" aria-label="Next page" rel="next">&gt;</a></li></ul></div> */}
    </>

  );
};

export default UserArticle;
