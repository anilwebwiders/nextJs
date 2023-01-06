/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
import { getFetchData, postData } from "../../../../utils/api-client";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../../../Preloader/Preloader";
import { notifyError, notifySuccess } from "../../../../store/notify/action";

const UserStoryFav = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [page, setPage] = useState(0);
  const handleShow = () => {
    setPage(page + 12);
  };
  const [load, setLoad] = useState(true);
  const [story, setStory] = useState([]);
  const getUsersActivity = useCallback(async () => {
    setLoad(true);
    const storyData = await getFetchData(
      `userApi/page/storyBookMark?user_id=${auth.user.user_id}&show=${page}`,
      auth.token
    );
    setStory([...story, ...storyData]);
    setLoad(false);
  }, [auth, page]);

  useEffect(() => {
    getUsersActivity();
  }, [getUsersActivity]);
  const [delLoad, setDelLoad] = useState(null);
  const deleteStory = async (id) => {
    setDelLoad(id);
    const data = await postData(
      `userApi/page/storyBookMark`,
      { story_id: id, user_id: auth.user.user_id },
      auth.token
    );
    setDelLoad(null);
    getUsersActivity();
    if (data.err) return dispatch(notifyError(data.err));
    if (data.success) return dispatch(notifySuccess("Deleted Successfully"));
  };
  return (
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
              <th>Action</th>
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
                  {moment(story.created_at.split("T")[0]).format("MM/DD/YY")}
                </td>
                <td>
                  {delLoad == story.story_id ? (
                    <p>...Loading...</p>
                  ) : (
                    <ul>
                      <li>
                        <a
                          style={{ cursor: "pointer" }}
                          className="delet-btn"
                          onClick={() => deleteStory(story.story_id)}
                        >
                          Delete
                        </a>
                      </li>
                    </ul>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {story.length >= 12 && (
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
  );
};

export default UserStoryFav;
