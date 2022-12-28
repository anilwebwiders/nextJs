/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { getAll } from "../../../utils/api-client";
import CommonStory from "./commonStory/CommonStory";
import Preloader from "../../Preloader/Preloader";
import Paginate from "../../Paginate/Paginate";
import { useSelector } from "react-redux";

const PopularStory = ({ type, fetchData, storyPage }) => {
  const { user } = useSelector((state) => state.auth);
  const [loader, setloader] = useState(true);
  const [stories, setStories] = useState([]);
  const [storyCount, setStoryCount] = useState([]);

  const pageCount = Math.ceil(storyCount / 12);
  
  const getPopularStory = useCallback(async () => {
       setloader(true);

    const data = await getAll(`storyApi/popular/${type}?page=${storyPage}&user_id=${user?.user_id}`);
    console.log(data);
    setStories(data.data);
    setStoryCount(data.count);

    setloader(false);
  }, [storyPage, type]);

  useEffect(() => {
    getPopularStory();
  }, [getPopularStory]);

  return (
    <div>
      {loader ? (
        <div className="article-stories-box">
          <span className="text-center">
            <Preloader />
          </span>
        </div>
      ) : (
        <CommonStory story={stories} />
      )}
      <Paginate pageCount={pageCount} fetchData={fetchData} />
    </div>
  );
};

export default PopularStory;
