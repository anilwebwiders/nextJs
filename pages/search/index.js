/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from "react";
import { getAll } from "../../utils/api-client";
import Paginate from "../../component/Paginate/Paginate";
import { useRouter } from "next/router";
import HeadData from "../../component/HeadData";
import Nothing from "../../component/Nothing/Nothing";
import UserSearch from "../../component/User/UserSearch/UserSearch";
import Preloader from "../../component/Preloader/Preloader";
import SearchStory from "../../component/Story/SearchStory/SearchStory";
import SearchArticle from "../../component/Article/SearchArticle/SearchArticle";
import { useSelector } from "react-redux";

const Search = () => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("story");

  const [data, setData] = useState([]);
  const [Count, setCount] = useState([]);

  const [page, setPage] = useState(0);
  const [loader, setLoader] = useState(false);

  const getData = useCallback(async () => {
    const delayDebounce = setTimeout(async () => {
      setLoader(true);
      const data = await getAll(
        `searchApi?search=${search}&type=${type}&show=${page}&user_id=${user.user_id}`
      );
      setData(data.data);
      setCount(data?.count[0].count);
      setLoader(false);
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [page, search, type]);

  useEffect(() => {
    getData();
  }, [getData]);

  const pageCount = Math.ceil(Count / 12);
  const fetchData = (page) => {
    setPage(page.selected + 1);
  };

  const handleType = (e) => {
    setType(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <div>
      <HeadData />
      <div className="m-0 search">
        <div className="mt-4 d-flex justify-content-center">
          <div className="profile-posts-view">
            <form>
              <input
                type="text"
                className="form-control pl-5 pr-5"
                placeholder="Search"
                onKeyPress={(e) => {
                  e.key === "Enter" && e.preventDefault();
                }}
                defaultValue={search}
                onChange={handleSearch}
              />
              <a>
                <img src="/search-icon.svg" alt="searchicon" />
              </a>
            </form>
          </div>
        </div>
        <div className="innerbanner serach_bx">
          <div className="innerbanner__img"> <img src="/innerbanner-img.jpg" alt="" /> </div>
          <h1 className="banner-title">Search</h1>
          <div className="banner-search">
            <div className="search-box">
              <div className="custom-select-box">
                <div className="select-box"><select
                  className="form-control"
                  name="category"
                  onChange={handleType}
                >
                  <option selected value="story">
                    Story
                  </option>
                  <option value="article">Article</option>
                  <option value="user">User</option>
                </select></div>
              </div>
              <div className="search-right">
                <input type="text" className="form-control pl-5 pr-5"
                  placeholder="Search"
                  onKeyPress={(e) => {
                    e.key === "Enter" && e.preventDefault();
                  }}
                  defaultValue={search}
                  onChange={handleSearch}
                />
                <button ><img src="/search-icon (1).svg" alt="" /> Search</button>
              </div>
            </div>
          </div>
        </div>

       

        {type == "story" && (
          <>
            {data.length === 0 ? (
              <Nothing />
            ) : (
              <>
                {loader ? (
                  <Preloader />
                ) : (
                  <div className="related-articles mx-auto container-fluid story_div">
                    <div className="row ml-0">
                      {data.map((story) => (
                        <SearchStory story={story} key={story.story_id} />
                      ))}
                    </div>
                  </div>
                )}
                <Paginate pageCount={pageCount} fetchData={fetchData} />
              </>
            )}
          </>
        )}
        {type == "article" && (
          <>
            {data.length === 0 ? (
              <Nothing />
            ) : (
              <>
                {loader ? (
                  <Preloader />
                ) : (
                  <div className="related-articles mx-auto container-fluid article_div">
                    <div className="row">
                      {data.map((article) => (
                        <SearchArticle
                          article={article}
                          key={article.article_id}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <Paginate pageCount={pageCount} fetchData={fetchData} />
              </>
            )}
          </>
        )}
        {type == "user" && (
          <>
            {data.length === 0 ? (
              <Nothing />
            ) : (
              <>
                {loader ? <Preloader /> : <UserSearch user={data} />}
                <Paginate pageCount={pageCount} fetchData={fetchData} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Search;
