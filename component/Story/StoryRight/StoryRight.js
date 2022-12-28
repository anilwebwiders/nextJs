/* eslint-disable react/jsx-key */
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getAll } from "../../../utils/api-client";
import Preloader from "../../Preloader/Preloader";
import StoryRightDetails from "./StoryRightDetails";

const StoryRight = ({ storyPage, type }) => {
  const [load, setLoad] = useState(false);
  const [allStory, setAllStory] = useState([]);

  const getStory = useCallback(async () => {
    setLoad(true);
    const data = await getAll(`storyApi/sidebar/${type}?page=${storyPage}`);
    setAllStory(data.data);
    setLoad(false);
  }, [storyPage, type]);

  useEffect(() => {
    getStory();
  }, [getStory]);

  return (
    <div className="article-left-right">
       <div className="title">
          <h3>RECENT STORIES</h3>
          <Link href="/">
            <a>View all</a>
          </Link>
        </div>
      <div className="article-stories">
       

        {load ? (
          <div className="article-stories-box">
            <span className="text-center">
              <Preloader />
            </span>
          </div>
        ) : (
          allStory?.map((story) => (
            <StoryRightDetails key={story.story_id} story={story} />
          ))
        )}
      </div>
    </div>
  );
};

export default StoryRight;
