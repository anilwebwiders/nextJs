/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Link from "next/link";
import StoryLikes from "../../StoryDetails/StoryDetialsElem/StoryLikes";
import { useSelector } from "react-redux";
import StoryShareModal from "../../StoryDetails/StoryDetialsElem/StoryShareModal";
const StoryShareModelNew = ({ story }) => {
    const [open, setOpen] = useState(false);
    const toggle = (s) => setOpen(!open);

    return (
        <>
            <li><a onClick={toggle}><span><img src="/post-card-share-icon.png" alt="" /></span></a></li>
            {open && (
                <StoryShareModal
                    open={open}
                    toggle={toggle}
                    title={story.title}
                    story_id={story.story_id}
                />
            )}
        </>
    );
};

export default StoryShareModelNew;