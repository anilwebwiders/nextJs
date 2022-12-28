/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { getFetchData } from "../../../../utils/api-client";
import Preloader from "../../../Preloader/Preloader";

const UserFollowing = ({ auth }) => {
  const [page, setPage] = useState(0);
  const handleShow = () => {
    setPage(page + 12);
  };
  const [load, setLoad] = useState(true);
  const [following, setFollowing] = useState([]);
  const handleSearch = async (e) => {
    setSearchTxt(e.target.value);
  };
  const getUsersActivity = useCallback(async () => {
    //Story
    setLoad(true);
    const followingData = await getFetchData(
      `userApi/page/following?user_id=${auth.user.user_id}&show=${page}`,
      auth.token
    );
    setFollowing([...following, ...followingData.data]);
    setLoad(false);
  }, [auth, page]);

  useEffect(() => {
    getUsersActivity();
  }, [getUsersActivity]);
  return (


    <div className="profile-posts-inner">
      {/* <div className="table-responsive">
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
      </div> */}
      <div className="profile-posts-view">
        <Link href="/">
          <a className="view-all">{following.length} following</a>
        </Link>
        <div className="profile-search">
          <div class="select-box"><select class="dropdownpost-profile">
            <option>Sort by</option>
          </select>
          </div>
          <form>
            <input
              type="text"
              className="form-control"
              placeholder=""
              onChange={handleSearch}
            />
            <a>
              <img src="/search-icon.svg" alt="searchicon" />
            </a>
          </form>
        </div>
      </div>
      <div class="row pt-4">
        {following.map((user) => (
          <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="followers-item">
              <div class="followers-img"><img src={user.avatar} alt="user img" /></div>
              <div class="followers-right">
                <Link
                  href={{
                    pathname: `/user/[id]/[username]`,
                    query: {
                      id: user.user_id,
                      username: user.username,
                    },
                  }}
                >
                  <h6>{user.full_name}</h6>
                </Link>
                <p>@{user.username}</p>
                <Link
                  href={{
                    pathname: `/user/[id]/[username]`,
                    query: {
                      id: user.user_id,
                      username: user.username,
                    },
                  }}
                >
                  <a href="#" class="followers-right-icon"><img src="/following-icon.png" alt="" /></a>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div class="d-flex justify-content-center p-5">
        {following.length > 12 && (
          <h4
            className="button_show"
            style={{ cursor: "pointer" }}
            onClick={handleShow}
          >
            {load ? <Preloader /> : "Show More"}
          </h4>
        )}
        {/* <ul class="pagination">
               <li class="page-item disabled">
                  <a class="page-link" tabindex="0" role="button" aria-disabled="true" aria-label="Previous page" rel="prev">&lt;</a>
               </li>
               <li class="page-item active">
                  <a role="button" class="page-link" tabindex="0" aria-label="Page 1 is your current page" aria-current="page">1</a>
               </li>
               <li class="page-item">
                  <a role="button" class="page-link" tabindex="0" aria-label="Page 2">2</a>
               </li>
               <li class="page-item">
                  <a role="button" class="page-link" tabindex="0" aria-label="Page 3">3</a>
               </li>
               <li class="page-item">
                  <a role="button" class="page-link" tabindex="0" aria-label="Page 4">4</a>
               </li>
               <li class="page-item">
                  <a role="button" class="page-link" tabindex="0" aria-label="Page 5">5</a>
               </li>
               <li class="page-item">
                  <a class="page-link" tabindex="0" role="button" aria-disabled="false" aria-label="Next page" rel="next">&gt;</a>
               </li>
            </ul> */}
      </div>
    </div>
  );
};

export default UserFollowing;
