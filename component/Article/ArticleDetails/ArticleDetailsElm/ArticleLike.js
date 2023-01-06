/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll, postData } from "../../../../utils/api-client";

const ArticleLike = ({article_id, auth}) => {
  const dispatch = useDispatch();
  const [likeCount, setLikeCount] = useState(null);
  const getLike = useCallback(async () => {
    const data = await getAll(
      `articleApi/like?article_id=${article_id}&user_id=${auth.user.user_id}`
    );
    setLikeCount(data.length);
    console.log(data)
    
    const likeData =data &&  data.filter((id) => id.user_id == auth.user.user_id);
    likeData.length === 0 ? setLikeLight(false) : setLikeLight(true);
  }, [article_id, auth]);

  useEffect(() => {
    getLike();
  }, [getLike]);

  const [likeLight, setLikeLight] = useState(false);
  const postLike = async () => {
    setLikeLight(!likeLight);
    const postInfo = { user_id: auth.user.user_id, article_id };
    const data = await postData(`articleApi/like`, postInfo, auth.token);
    if (data.err) {
      dispatch(notifyError(data.err));
      setLikeLight(false);
    }
    getLike();
  };
  return (
    <>
   <li>
        <a onClick={postLike}>
          <strong>{likeCount == 0 ? "" : likeCount}</strong>
          {likeLight ? (
            <img src="/thumb-up-hover.svg" alt="like" />
          ) : (
            <img src="/thumb-up-icon.svg" alt="like" />
          )}
        </a>
      </li>
    </>
  );
};

export default ArticleLike;
