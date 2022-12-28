/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifyError, notifySuccess } from "../../../store/notify/action";
import { deleteData, getFetchData } from "../../../utils/api-client";
import Preloader from "../../Preloader/Preloader";
import Link from "next/link";
import Paginate from "../../Paginate/Paginate";
const StoriesData = ({ getCount }) => {
  const token = useSelector((state) => state.auth.token);
  const [page, setPage] = useState(0);
  const fetchDataStory = () => {
    setPage(page + 12);
  };
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [order, setOrder] = useState("DESC");
  const [status, setStatus] = useState(1);
  const [community, setCommunity] = useState(0);
  const [data, setData] = useState([]);
  const handleStatus = (data) => {
    setPage(0);
    setData([]);
    setOrder(data);
  };
  const handleOrder = (data) => {
    setPage(0);
    setData([]);
    setStatus(data);
  };
  const hanldeCommunity = (value) => {
    setPage(0);
    setData([]);
    setCommunity(value);
  };
  const get = useCallback(async () => {
    setLoader(true);
    const stories = await getFetchData(
      `adminApi/stories?status=${status}&order=${order}&community=${community}&page=${page}`,
      token
    );
    setData([...data, ...stories]);
    setLoader(false);
  }, [page, order, status, community]);

  useEffect(() => {
    get();
  }, [get]);
  //   //Ban Article
  const [banLoader, setBanLoader] = useState(null);
  const deleteStory = async (id) => {
    setBanLoader(id);
    const data = await deleteData(`userApi/page/story?story_id=${id}`, token);
    setBanLoader(null);
    getCount();
    get();
    if (data.err) return dispatch(notifyError(data.err));
    if (data.success) return dispatch(notifySuccess("Deleted Successfully"));
  };
  //Search
  const [searcPage, setSearchPage] = useState(0);
  const [searchTxt, setSearchTxt] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searchDataCount, setSearchDataCount] = useState([]);
  const handleSearch = async (e) => {
    setSearchTxt(e.target.value);
  };
  const getSearch = useCallback(async () => {
    const delayDebounce = setTimeout(async () => {
      setLoader(true);
      const storiesSearch = await getFetchData(
        `adminApi/stories/search?status=${status}&order=${order}&community=${community}&search=${searchTxt}&page=${searcPage}`,
        token
      );
      setSearchData(storiesSearch.story);
      setSearchDataCount(storiesSearch.count);
      setLoader(false);
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [searcPage, order, status, community, searchTxt]);

  useEffect(() => {
    getSearch();
  }, [getSearch]);
  //Paination
  const pageCount = Math.ceil(searchDataCount / 12);
  const fetchData = (page) => {
    setSearchPage(page.selected + 1);
  };
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="profile-posts-view mt-5">
          <form>
            <input
              type="text"
              className="form-control"
              placeholder="Search Posts"
              onChange={handleSearch}
            />
            <a>
              <img src="/search-icon.svg" alt="searchicon" />
            </a>
          </form>
        </div>
      </div>

      {searchTxt.length === 0 ? (
        <>
          <table className="table table-data mt-5">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">
                  <select
                    name="status"
                    onChange={(e) => hanldeCommunity(e.target.value)}
                  >
                    <option value="0">All Community</option>
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
                </th>
                <th scope="col">Comments</th>
                <th scope="col">Username</th>
                <th scope="col">Thumbnail</th>
                <th scope="col">Tags</th>
                <th scope="col">
                  <select
                    name="status"
                    onChange={(e) => handleStatus(e.target.value)}
                  >
                    <option className="text-success" value="DESC">
                      Recent
                    </option>
                    <option className="text-danger" value="ASC">
                      Earliest
                    </option>
                  </select>
                </th>
                <th scope="col">
                  <select
                    name="status"
                    onChange={(e) => handleOrder(e.target.value)}
                  >
                    <option className="text-success" value="1">
                      Active
                    </option>
                    <option className="text-danger" value="0">
                      In Active
                    </option>
                  </select>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((story) => (
                <tr key={story.story_id}>
                  <td>{story.story_id}</td>
                  <td>
                    {status == "1" ? (
                      <Link
                        href={
                          "/story/" +
                          story.story_id +
                          "/" +
                          story?.title?.replace(/\s/g, "-").substring(0, 60)
                        }
                      >
                        {story.title}
                      </Link>
                    ) : (
                      <>{story.title}</>
                    )}
                  </td>
                  <td>{story.community_title}</td>
                  <td>
                    <button className="btn btn-warning text-white">
                      <Link
                        href={{
                          pathname: `/admin/stories/comment/[id]`,
                          query: { id: story.story_id },
                        }}
                      >
                        <a>Show </a>
                      </Link>
                    </button>
                  </td>
                  <td>{story.username}</td>
                  <td>
                    <img
                      src={story.post_thumbnail}
                      alt="storyImage"
                      width="50px"
                      height="50px"
                    />
                  </td>
                  <td>{story.tags}</td>
                  <td>
                    {moment(story.created_at.split("T")[0]).format("MM/DD/YY")}
                  </td>
                  <td>
                    {status == "1" ? (
                      <>
                        {banLoader === story.story_id ? (
                          "...processing..."
                        ) : (
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteStory(story.story_id)}
                          >
                            Delete
                          </button>
                        )}
                      </>
                    ) : (
                      "Deleted"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4
            className="text-warning text-center my-4"
            style={{ cursor: "pointer" }}
            onClick={fetchDataStory}
          >
            {loader ? <Preloader /> : "Show More"}
          </h4>
        </>
      ) : (
        <>
          <table className="table table-data mt-5">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">
                  <select
                    name="status"
                    onChange={(e) => hanldeCommunity(e.target.value)}
                  >
                    <option value="0">All Community</option>
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
                </th>
                <th scope="col">Comments</th>
                <th scope="col">Username</th>
                <th scope="col">Thumbnail</th>
                <th scope="col">Tags</th>
                <th scope="col">
                  <select
                    name="status"
                    onChange={(e) => handleStatus(e.target.value)}
                  >
                    <option className="text-success" value="DESC">
                      Recent
                    </option>
                    <option className="text-danger" value="ASC">
                      Earliest
                    </option>
                  </select>
                </th>
                <th scope="col">
                  <select
                    name="status"
                    onChange={(e) => handleOrder(e.target.value)}
                  >
                    <option className="text-success" value="1">
                      Active
                    </option>
                    <option className="text-danger" value="0">
                      In Active
                    </option>
                  </select>
                </th>
              </tr>
            </thead>
            <tbody>
              {searchData.map((story) => (
                <tr key={story.story_id}>
                  <td>{story.story_id}</td>
                  <td>
                    {status == "1" ? (
                      <Link
                        href={
                          "/story/" +
                          story.story_id +
                          "/" +
                          story?.title?.replace(/\s/g, "-").substring(0, 60)
                        }
                      >
                        {story.title}
                      </Link>
                    ) : (
                      <>{story.title}</>
                    )}
                  </td>
                  <td>{story.community_title}</td>
                  <td>
                    <button className="btn btn-warning text-white">
                      <Link
                        href={{
                          pathname: `/admin/stories/comment/[id]`,
                          query: { id: story.story_id },
                        }}
                      >
                        <a>Show </a>
                      </Link>
                    </button>
                  </td>
                  <td>{story.username}</td>
                  <td>
                    <img
                      src={story.post_thumbnail}
                      alt="storyImage"
                      width="50px"
                      height="50px"
                    />
                  </td>
                  <td>{story.tags}</td>
                  <td>
                    {moment(story.created_at.split("T")[0]).format("MM/DD/YY")}
                  </td>
                  <td>
                    {status == "1" ? (
                      <>
                        {banLoader === story.story_id ? (
                          "...processing..."
                        ) : (
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteStory(story.story_id)}
                          >
                            Delete
                          </button>
                        )}
                      </>
                    ) : (
                      "Deleted"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4
            className="text-warning d-flex justify-content-center text-center my-4"
            style={{ cursor: "pointer" }}
          >
            {loader && <Preloader />}
          </h4>
          <Paginate pageCount={pageCount} fetchData={fetchData} />
        </>
      )}
    </>
  );
};

export default StoriesData;
