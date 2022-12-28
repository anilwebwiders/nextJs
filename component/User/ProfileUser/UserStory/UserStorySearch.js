/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";
import { notifyError, notifySuccess } from "../../../../store/notify/action";
import { deleteData } from "../../../../utils/api-client";
import Paginate from "../../../Paginate/Paginate";

const UserStorySearch = ({ search, count, setSearchPage }) => {
  const [delLoad, setDelLoad] = useState(null);
  const deleteStory = async (id) => {
    setDelLoad(id);
    const data = await deleteData(
      `userApi/page/story?story_id=${id}`,
      auth.token
    );
    setDelLoad(null);
    getUsersActivity();
    if (data.err) return dispatch(notifyError(data.err));
    if (data.success) return dispatch(notifySuccess("Deleted Successfully"));
  };
  const pageCount = Math.ceil(count / 12);
  const fetchData = (page) => {
    setSearchPage(page.selected + 1);
  };
  return (
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
          {search.map((story) => (
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
                {delLoad === story.story_id ? (
                  <p>...Loading...</p>
                ) : (
                  <ul>
                    <Link
                      href={{
                        pathname: "/story/edit/[id]",
                        query: { id: story.story_id },
                      }}
                    >
                      <a>
                        <li>
                          <a style={{ cursor: "pointer" }}>Edit</a>
                        </li>
                      </a>
                    </Link>
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
      <Paginate pageCount={pageCount} fetchData={fetchData} />
    </div>
  );
};

export default UserStorySearch;
