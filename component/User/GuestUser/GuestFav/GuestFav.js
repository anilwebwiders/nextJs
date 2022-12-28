import React, { useState } from "react";
import GuestArticleFav from "./GuestArticleFav";
import GuestStoryFav from "./GuestStoryFav";

const GuestFav = ({user}) => {
    const [active, setActive] = useState('story')
  return (
    <div className="mt-5 fav">
      <div className="text-center">
        <span className={active == "story" ? `activefav p-2` : `p-2`} onClick={()=> setActive("story")} style={{cursor: 'pointer'}} ><b>Story</b></span>
        <span className={active == "article" ? `activefav p-2` : `p-2`} onClick={()=> setActive("article")} style={{cursor: 'pointer'}} ><b>Article</b></span>
      </div>
        {active == 'story' && <GuestStoryFav user={user}/>}
        {active == 'article' && <GuestArticleFav user={user}/>}
    </div>
  );
};

export default GuestFav;
