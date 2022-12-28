import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifyError, notifySuccess } from "../../../../store/notify/action";
import { getFetchData, postData } from "../../../../utils/api-client";

const Follow = ({ id }) => {
  const auth = useSelector((state) => state.auth);
  const userMatched = id === auth.user.user_id;
  const dispatch = useDispatch();
  // documents.map(id=> id.user_id == user_id)
  const [follow, setFollow] = useState([]);
  const [load, setLoad] = useState(false);
  const getFollow = useCallback(async () => {
    setLoad(true);
    const res = await getFetchData(
      `userApi/follow?user_id=${id}&follower_id=${auth.user.user_id}`,
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
      { user_id: auth.user.user_id, follower_id: id },
      auth.token
    );
    if (data.err) return dispatch(notifyError(data.err));
    getFollow();
  };
  
  return (
    <>
      {load ? (
        <>
          <h4>Loading</h4>
        </>
      ) : (
        <>
          {!userMatched && (
            <h4 style={{ cursor: "pointer" }} onClick={postFollow}>
              {follow.length === 0 ? "follow" : "following"}
            </h4>
          )}
        </>
      )}
    </>
  );
};

export default Follow;
