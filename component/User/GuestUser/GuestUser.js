/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifyError, notifySuccess } from "../../../store/notify/action";
import { getFetchData, postData } from "../../../utils/api-client";
import GuestRoute from "./GeustRoute";
const GuestUser = ({ user }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [follow, setFollow] = useState(false);
  const [load, setLoad] = useState(false);
  const getFollow = useCallback(async () => {
    setLoad(true);
    const res = await getFetchData(
      `userApi/follow?user_id=${user.user_id}&follower_id=${auth.user.user_id}`,
      auth.token
    );
    
    setFollow(res.data);
    setLoad(false);
  }, [auth]);

  useEffect(() => {
    getFollow();
  }, [getFollow]);

  const postFollow = async () => {
    const data = await postData(
      `userApi/follow`,
      { user_id: auth.user.user_id, follower_id: user.user_id },
      auth.token
    );
    if (data.err) return dispatch(notifyError(data.err));
    getFollow();
  };

  return (
    <div>
      <section className="profile-sec">
        <section className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="profile-inner">
                <div className="image-holder">
                  <img
                    src={user.avatar}
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="profile-right">
                  <div className="text-box">
                    <h3>{user.full_name}</h3>
                    <h4>@{user.username}</h4>
                    <ul>
                      <li>
                        {load ? (
                          <a className="edit-btn">
                            Loading
                          </a>
                        ) : (
                          <a className="edit-btn" onClick={postFollow}>
                            {follow.length === 0 ? "follow" : "following"}
                          </a>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <GuestRoute user={user}  getFollow={ getFollow} follow={follow}/>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default GuestUser;
