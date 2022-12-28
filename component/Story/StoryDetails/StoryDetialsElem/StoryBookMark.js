/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFetchData, postData } from "../../../../utils/api-client";

const StoryBookMark = ({ story_id, auth }) => {
  const dispatch = useDispatch();
  // documents.map(id=> id.user_id == user_id)
  const user_id = auth.user.user_id;
  const [bookMark, setBookMark] = useState(false);
  const [load, setLoad] = useState(true);
  const getBookMark = useCallback(async () => {
    const data = await getFetchData(
      `storyApi/bookMark?story_id=${story_id}&user_id=${user_id}`
    );
    setBookMark(data.length > 0);
    setLoad(false);
  }, [auth]);


  useEffect(() => {
    getBookMark();
  }, [getBookMark]);
  const postBookMark = async () => {
    const postInfo = { user_id: auth.user.user_id, story_id };
    const data = await postData(`storyApi/bookMark`, postInfo, auth.token);
    if (data.err) return dispatch(notifyError(data.err));
    getBookMark();
  };

  const toggle = () => {
    postBookMark();
    setBookMark(!bookMark);
  };

  return (
    <>
      <li>
        <a onClick={toggle}>
          {bookMark === false ? (
            <img src="/bookmark-icon.svg" alt="bookMark" />
          ) : (
            <img src="/bookmark-hover.svg" alt="bookMark" />
          )}
        </a>
      </li>
    </>
  );
};

export default StoryBookMark;
