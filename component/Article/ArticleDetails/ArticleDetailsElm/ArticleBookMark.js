/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFetchData, postData } from "../../../../utils/api-client";

const ArticleBookMark = ({ article_id, auth }) => {
  const dispatch = useDispatch();
  // documents.map(id=> id.user_id == user_id)
  const [bookMark, setBookMark] = useState(false);
  const [load, setLoad] = useState(true);
  const getBookMark = useCallback(async () => {
    const data = await getFetchData(
      `articleApi/bookMark?article_id=${article_id}&user_id=${auth.user.user_id}`
    );
    setBookMark(data.length > 0);
    setLoad(false);
  }, [article_id, auth]);

  useEffect(() => {
    getBookMark();
  }, [getBookMark]);
  const postBookMark = async () => {
    const postInfo = { user_id: auth.user.user_id, article_id };
    const data = await postData(`articleApi/bookMark`, postInfo, auth.token);
    if (data.err) return dispatch(notifyError(data.err));
    getBookMark();
  };

  return (
    <>
      <li>
        <a onClick={postBookMark}>
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

export default ArticleBookMark;
