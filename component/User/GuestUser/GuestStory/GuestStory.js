/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { getFetchData } from "../../../../utils/api-client";
import Preloader from "../../../Preloader/Preloader";

const GuestStory = ({ user }) => {
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
      `userApi/page/story?user_id=${user.user_id}&show=${page}`
    );
    setStory([...story, ...storyData]);
    setLoad(false);
  }, [user, page]);

  useEffect(() => {
    getUsersActivity();
  }, [getUsersActivity]);

  return (
    <div>
      <div className="profile-posts-view">
        <form>
          <input
            type="text"
            className="form-control"
            placeholder="Search Posts"
          />
          <a>
            <img src="/search-icon.svg" alt="searchicon" />
          </a>
        </form>
        <Link href="/">
          <a className="view-all">View all posts</a>
        </Link>
      </div>
      <div className="profile-posts-inner">
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>
                  Category <img src="/double-arrow.svg" alt="" />
                </th>
                <th>
                  Date <img src="/double-arrow.svg.default" alt="" />
                </th>
     
              </tr>
            </thead>
            <tbody>
              {story?.map((story) => (
                <tr key={story.story_id}>
                  <Link
                    href={
                      "/story/" +
                      story.story_id +
                      "/" +
                      story?.title?.replace(/\s/g, "-").substring(0, 60)
                    }
                  >
                    <a>
                      <td>
                        <p>{story.title.substring(0, 60)}...</p>
                      </td>
                    </a>
                  </Link>
                  <td>{story.community_title}</td>
                  <td>
                    {moment(story.created_at.split("T")[0]).format(
                      "MM/DD/YY"
                    )}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
          <h4
            className="text-warning text-center p-5"
            style={{ cursor: "pointer" }}
            onClick={handleShow}
          >
            {load ? <Preloader /> : "Show More"}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default GuestStory;
