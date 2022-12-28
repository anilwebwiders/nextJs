/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { notifyError, notifySuccess } from "../../../../store/notify/action";
import { deleteData, getFetchData } from "../../../../utils/api-client";
import DeleteModal from "../../../Modal/Delete/DeleteModal";
import Preloader from "../../../Preloader/Preloader";
import UserStorySearch from "./UserStorySearch";

const UserStory = ({ auth }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const handleShow = () => {
    setPage(page + 12);
  };
  const [load, setLoad] = useState(true);
  const [story, setStory] = useState([]);
  const getUsersActivity = useCallback(async () => {
    //Story
    setLoad(true);
    const storyData = await getFetchData(
      `userApi/page/story?user_id=${auth.user.user_id}&show=${page}`,
      auth.token
    );
    setStory([...story, ...storyData]);
    //setStory([...storyData]);
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
    setTitle(data)
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
    //Story
    setLoad(true);
    const storyData = await getFetchData(
      `userApi/page/story/search?user_id=${auth.user.user_id}&search=${searchTxt}&show=${searchPage}`
    );
    setCount(storyData.count);
    setSearch(storyData.data);
    setLoad(false);
  }, [searchTxt, searchPage]);

  useEffect(() => {
    getSearch();
  }, [getSearch]);

  console.log('story', story)

  return (
    <div>
      <DeleteModal
        toggleDelete={toggleDelete}
        modalDelete={modalDelete}
        auth={auth}
        title={title}
        type={"story"}
        url={`userApi/page/story?story_id=${id}`}
        redirect={getUsersActivity}
      />
      <div className="profile-posts-view">
        <Link href="/">
          <a className="view-all">{story.length} Story Posted</a>
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

          // <div className="table-responsive">
          //   <table>
          //     <thead>
          //       <tr>
          //         <th>Title dsgdhjl</th>
          //         <th>
          //           Category <img src="/double-arrow.svg" alt="" />
          //         </th>
          //         <th>
          //           Date <img src="/double-arrow.svg.default" alt="" />
          //         </th>
          //         <th>Action</th>
          //       </tr>
          //     </thead>
          //     <tbody>
          //       {story?.map((story) => (
          //         <tr key={story.story_id}>
          //           <Link
          //             href={
          //               "/story/" +
          //               story.story_id +
          //               "/" +
          //               story?.title?.replace(/\s/g, "-").substring(0, 60)
          //             }
          //           >
          //             <a>
          //               <td>
          //                 <p>{story.title.substring(0, 60)}...</p>
          //               </td>
          //             </a>
          //           </Link>
          //           <td>{story.community_title}</td>
          //           <td>
          //             {moment(story.created_at.split("T")[0]).format(
          //               "MM/DD/YY"
          //             )}
          //           </td>
          //           <td>
          //             <ul>
          //               <Link
          //                 href={{
          //                   pathname: "/story/edit/[id]",
          //                   query: { id: story.story_id },
          //                 }}
          //               >
          //                 <a>
          //                   <li>
          //                     <a style={{ cursor: "pointer" }}>Edit</a>
          //                   </li>
          //                 </a>
          //               </Link>
          //               <li>
          //                 <a
          //                   style={{ cursor: "pointer" }}
          //                   className="delet-btn"
          //                   onClick={() => toggleDelete(story.story_id, story.title)}
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
          <div className="table-border-radius">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Post Title</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th><div className="group-btn">Action</div></th>
                  </tr>
                </thead>
                <tbody>
                  {story?.map((story) => (
                    <tr>

                      <td>{story.title.substring(0, 60)}...</td>
                      <td>{story.community_title}</td>
                      <td>{moment(story.created_at.split("T")[0]).format(
                        "MM/DD/YY"
                      )}</td>
                      <td>
                        <div className="group-btn">
                          <Link
                            href={
                              "/story/" +
                              story.story_id +
                              "/" +
                              story?.title?.replace(/\s/g, "-").substring(0, 60)
                            }
                          >
                            <a href="#"><img src="/action1.png" alt="" /></a>
                          </Link>
                          <Link
                            href={{
                              pathname: "/story/edit/[id]",
                              query: { id: story.story_id },
                            }}
                          >
                            <a href="#"><img src="/action2.png" alt="" /></a>
                          </Link>

                          <a
                            style={{ cursor: "pointer" }}
                            className="delet-btn"
                            onClick={() => toggleDelete(story.story_id, story.title)}
                          >
                            <img src="/action3.png" alt="" />
                          </a>

                          <a href="#"></a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {story.length > 12 && (
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
          <UserStorySearch
            search={search}
            count={count}
            setSearchPage={setSearchPage}
          />
        )}
      </div>
      { /*<div className="d-flex justify-content-center p-5"><ul className="pagination"><li className="page-item disabled"><a className="page-link" tabindex="0" role="button" aria-disabled="true" aria-label="Previous page" rel="prev">&lt;</a></li><li className="page-item active"><a role="button" className="page-link" tabindex="0" aria-label="Page 1 is your current page" aria-current="page">1</a></li><li className="page-item"><a role="button" className="page-link" tabindex="0" aria-label="Page 2">2</a></li><li className="page-item"><a role="button" className="page-link" tabindex="0" aria-label="Page 3">3</a></li><li className="page-item"><a role="button" className="page-link" tabindex="0" aria-label="Page 4">4</a></li><li className="page-item"><a role="button" className="page-link" tabindex="0" aria-label="Page 5">5</a></li><li className="page-item"><a className="page-link" tabindex="0" role="button" aria-disabled="false" aria-label="Next page" rel="next">&gt;</a></li></ul></div> */}
    </div>
  );
};

export default UserStory;
