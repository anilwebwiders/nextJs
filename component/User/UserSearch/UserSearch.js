/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import { getAll, getFetchData } from "../../../utils/api-client";
import { useSelector } from "react-redux";
import Link from "next/link";
import PostCount from "./PostCount";
import PostFollowing from "./PostFollowing";
const UserSearch = ({ user }) => {
  const auth = useSelector((state) => state.auth);
  const [storyCount, setStoryCount] = useState([]);
  const getActivityCount = useCallback(async () => {
    //Story
    const count = await getFetchData(
      `userApi/page/count?user_id=${auth.user.user_id}`,
      auth.token
    );

    setStoryCount(count.story[0].story);
  }, [auth]);
  useEffect(() => {
    getActivityCount();
  }, [getActivityCount]);

  return (
    <div className="related-articles text-center">
      <div className='container-fluid'>
        <div className="row">
          {user.map(user =>
            <div key={user.user_id} className="col-md-4 col-lg-3">
              <Link href={"/user/" + user.user_id + "/" + user.username}>
                <a>
                  <div className="related-articles-box mx-auto container-fluid">
                    <div className="user-item">
                      {/*<div className="three-dots">
                      <div className="btn-group btn-group-sm special">
                        <a href="#" className="drop dropdown-btn" data-toggle="dropdown">
                          <img src="/three-dots.png" alt="" />
                        </a>
                        <ul className="dropdown-menu dropdown-menu__box">
                          <li className="drop-down__item">
                            <a href="#">abc</a>
                          </li>
                          <li className="drop-down__item">
                            <a href="#">abc</a>
                          </li>
                        </ul>
                      </div>
                    </div>*/}
                      <div className="user-body">
                        <div className="user-img">
                          <img src={user.avatar ? user.avatar : '/post-card-avtar-image-1.png'} alt="" /> {/* <img src={user.avatar} alt="userImage" className="img-fluid content-image cropped rounded-circle" /> */}
                        </div>
                        <div className="user-content">
                          <h3>{user.full_name}</h3>
                          <span>@{user.username}</span>
                        </div>
                        {/*<PostCount user_id={user.user_id} auth={auth}/>*/}
                        <div className="user-posts">
                          <div className="user-posts__left">{user.total_story} Posts</div>
                          <div className="user-posts__right">{user.total_follower} Followers</div>
                        </div>
                      </div>
                      
                      <PostFollowing user_id={user.user_id}  is_follow={user.is_follow} auth={auth}/> 
                    </div>
                  </div>
                </a>
              </Link>
            </div>)}
        </div>
      </div>
    </div>
  );
};

export default UserSearch;