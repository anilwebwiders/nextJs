/* eslint-disable @next/next/no-img-element */
import React, {useCallback, useEffect, useState } from "react";
import { getAll, getFetchData } from "../../../utils/api-client";
import { useDispatch, useSelector } from "react-redux";
const PostCount = ({user_id,auth}) => {
    const [storyCount, setStoryCount] = useState(0);
    const [storyFollowers, setStoryFollowers] = useState(0);
  
    const getActivityCount = useCallback(async () => {
    const count = await getFetchData(
        `userApi/page/count?user_id=${user_id}`,
        auth.token
        );
        
        setStoryCount(count.story[0].story);
        setStoryFollowers(count.following[0].my_followers);
    }, [user_id]);
    useEffect(() => {
        getActivityCount();
        getFollow();
      }, [getActivityCount,getFollow]);
    
  
    return (
        <div className="user-posts">
            <div className="user-posts__left">{storyCount} Posts</div>
            <div className="user-posts__right">{storyFollowers} Followers</div>
        </div>  
    );
};

export default PostCount;