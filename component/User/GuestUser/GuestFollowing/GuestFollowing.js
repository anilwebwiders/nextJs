/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { getFetchData } from "../../../../utils/api-client";
import Preloader from "../../../Preloader/Preloader";

const GuestFollowing = ({ user, getFollow }) => {
  const [page, setPage] = useState(0);
  const handleShow = () => {
    setPage(page + 12);
  };
  const [load, setLoad] = useState(true);
  const [following, setFollowing] = useState([]);
  const getUsersActivity = useCallback(async () => {
    //Story
    setLoad(true);
    const followingData = await getFetchData(
      `userApi/page/following?user_id=${user.user_id}&show=${page}`
    );
    setFollowing([...following, ...followingData.data]);
    getFollow()
    setLoad(false);
  }, [user, page]);

  useEffect(() => {
    getUsersActivity();
  }, [getUsersActivity]);
  return (
    <div className="profile-posts-inner">
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Profile Picture</th>
              <th>Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {following.map((user) => (
              <tr key={user.user_id}>
                <td>
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className={`img-fluid image-Short`}
                  />
                </td>
                <td>
                  <Link
                    href={{
                      pathname: `/user/[id]/[username]`,
                      query: {
                        id: user.user_id,
                        username: user.username,
                      },
                    }}
                  >
                    <a>{user.full_name}</a>
                  </Link>
                </td>
                <td>@{user.username}</td>
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
  );
};

export default GuestFollowing;
