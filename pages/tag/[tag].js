/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAll } from "../../utils/api-client";
import { useRouter } from "next/dist/client/router";
import Paginate from "../../component/Paginate/Paginate";
import filterSearch from "../../utils/filterSearch";

const TagsStory = (props) => {
  const router = useRouter();
  const [story, setStory] = useState(props.story[0]);
  const [count, setCount] = useState(props.count[0].[0].count);
  useEffect(() => {
    setStory(props.story[0]);
    setCount(props.count[0].[0].count)
  }, [props]);
  const pageCount = Math.ceil(count / 12)
  const fetchData = (page) =>{
    filterSearch({router, page: page.selected + 1})
  }
  return (
    <div className="related-articles pl-5 pr-5">
      <div className="story-tag">
        <h3>Tag :</h3>
        <ul>
          <li>{router.query.tag}</li>
        </ul>
      </div>

      <div className="row mt-5">
        {story?.map((story) => (
          <div
            key={story.story_id}
            className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6"
          >
            <Link
              href={
                "/story/" +
                story.story_id +
                "/" +
                story?.title?.replace(/\s/g, "-").substring(0, 60)
              }
            >
              <a>
                <div className="related-articles-box">
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
      <Paginate
        pageCount={pageCount}
        fetchData={fetchData}
      />
    </div>
  );
};

export async function getServerSideProps(query) {
  const tag = query.query.tag;
  const page = query.query.page - 1 || 0;
  const data = await getAll(`storyApi/tag?tag=${tag}&show=${page}`);

  return {
    props: {
      story: [data.data],
      count: [data.count],
    }, // will be passed to the page component as props
  };
}

export default TagsStory;
