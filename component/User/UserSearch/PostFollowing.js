/* eslint-disable @next/next/no-img-element */
import React, {useCallback, useEffect, useState } from "react";
import { getAll, getFetchData } from "../../../utils/api-client";
import { useDispatch, useSelector } from "react-redux";
const PostFollowing = ({user_id,auth,is_follow}) => {
   
 
    return (
        <div className="user-item__footer">
            {load ? (
                          <a className="btn__footer-user">
                            Loading
                          </a> 
                        ) : (
                          <a className="btn__footer-user" >
                            {is_follow > 0 ? "Following" : "Connect"}
                          </a>
                        )}
        </div> 
    );
};

export default PostFollowing;