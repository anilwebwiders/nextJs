/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifyError } from "../../../../store/notify/action";
import { getAll, postData } from "../../../../utils/api-client";
// import Preloader from "../../../Preloader/Preloader";

const StoryLikes = ({ story_id, total_likes, auth }) => {
  const dispatch = useDispatch();
  // documents.map(id=> id.user_id == user_id)
  // const [liked, setLiked] = useState([]);
  const [likeCount, setLikeCount] = useState(null);
  // const [load, setLoad] = useState(true);
  const getLike = useCallback(async () => {
    const data = await getAll(
      `storyApi/like?story_id=${story_id}&user_id=${auth.user.user_id}`
    );

    setLikeCount(data.length);
    const likeData =
      data && data.filter((id) => id.user_id == auth.user.user_id);
    likeData.length === 0 ? setLikeLight(false) : setLikeLight(true);
  }, [story_id, auth]);

  useEffect(() => {
    getLike();
  }, [getLike]);

  const [likeLight, setLikeLight] = useState(false);
  const postLike = async () => {
    setLikeLight(!likeLight);
    const postInfo = { user_id: auth.user.user_id, story_id };
    const data = await postData(`storyApi/like`, postInfo, auth.token);
    if (data.err) {
      dispatch(notifyError(data.err));
      setLikeLight(false);
    }
    getLike();
  };
  return (
    <>
      {/* <li>
        <a onClick={postLike}>
          <strong>{likeCount == 0 ? "" : likeCount}</strong>
          {liked.length === 0 ? (
            <img src="/thumb-up-icon.svg" alt="like" />
          ) : (
            <img src="/thumb-up-hover.svg" alt="like" />
          )}
        </a>
      </li> */}
      <li >

        <a onClick={postLike}>
          <span >{likeLight ? (
            <img src="/icon2.svg" alt="like" />
          ) : (
            <img src="/icon2.svg" alt="like" />
          )}</span>

          {likeCount == 0 ? "" : likeCount}
        </a>

      </li>
    </>
  );
};

export default StoryLikes;
