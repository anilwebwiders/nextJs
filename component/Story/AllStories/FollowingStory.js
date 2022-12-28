/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { getAll } from "../../../utils/api-client";
import CommonStory from "./commonStory/CommonStory";
import Preloader from "../../Preloader/Preloader";
import Paginate from "../../Paginate/Paginate";

const FollowingStory = ({ type, fetchData, storyPage, auth }) => {
  const [loader, setloader] = useState(true);
  const [stories, setStories] = useState([]);
  const [storyCount, setStoryCount] = useState([]);

  const pageCount = Math.ceil(storyCount / 12);

  const getFollowingStory = useCallback(async () => {
    if (auth.user.user_id) {
      setloader(true);
      const data = await getAll(
        `storyApi/following?type=${type}&user_id=${auth.user.user_id}&page=${storyPage}`
      );
      setStories(data.data);
      setStoryCount(data.count);
      setloader(false);
    }
  }, [storyPage, type, auth]);

  useEffect(() => {
    getFollowingStory();
  }, [getFollowingStory]);

  return (
    <div>
      {loader ? (
        <div className="article-stories-box">
          <span className="text-center">
            <Preloader />
          </span>
        </div>
      ) : stories?.length === 0 ? (
        <div className="text-center">
          <p className="p-5">
            This feed shows posts from users you are following but there are
            currently no active posts from users on your “following” list.
            <br></br>
            <b> Please follow additional users to fill up this feed.</b>
          </p>
        </div>
      ) : (
        <CommonStory story={stories} />
      )}
      <Paginate pageCount={pageCount} fetchData={fetchData} />
    </div>
  );
};

export default FollowingStory;
