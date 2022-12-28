/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { getAll } from "../../../utils/api-client";
import NormalPreloader from "../../Preloader/NormalPreloader";

const RelatedStory = ({ type, title }) => {
  const [load, setLoad] = useState(false);
  const [story, setStory] = useState([]);
  const getArticle = useCallback(async () => {
    setLoad(true);
    const data = await getAll(`storyApi/related/${type}?page=0`);
    setStory(data);
    setLoad(false);
  }, [type]);

  useEffect(() => {
    getArticle();
  }, [getArticle]);

  return (
    <div className="related-articles">
      <h3>Related Stories in {title}</h3>

      {load ? (
        <NormalPreloader />
      ) : (
        <div className="row">
          {story?.map((story) => (
            <div
              key={story.story_id}
              className="col-lg-3 col-md-4 mb-3"
            >
              <Link
                target="_blank"
                href={
                  "/story/" +
                  story.story_id +
                  "/" +
                  story?.title?.replace(/\s/g, "-").substring(0, 60)
                }
              >
                <a>
                  <div className="related-articles-box ">
                    <div className="image-holder">
                      {story.post_thumbnail ? (
                        <img
                          src={story.post_thumbnail}
                          alt="postImage"
                          className="img-fluid content-image cropped"
                        />
                      ) : (
                        <img
                          src={`/com/${story.community_id}.png`}
                          alt="postImage"
                          className="img-fluid content-image"
                        />
                      )}
                    </div>
                    <div className="text-box">
                      <h4>{story.community_title}</h4>
                      <span>
                        <strong>{story.username}</strong>
                      </span>
                      <p>{story.title}</p>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedStory;
