/* eslint-disable @next/next/no-img-element */
import React, { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import moment from "moment";
import Link from "next/link";
import ReportModelNew from "../StoryDetails/StoryDetialsElem/ReportModelNew";
import StoryLikes from "../StoryDetails/StoryDetialsElem/SearchStoryLikes";
import DeleteModal from "../../../component//Modal/Delete/DeleteModal";
import StoryShareModelNew from "../StoryDetails/StoryDetialsElem/StoryShareModelNew";
const SearchStory = ({ story }) => {
  const [id, setId] = useState(null);
  const toggleDelete = (id) => {
    setModalDelete(!modalDelete);
    setId(id);
  };
  const redirect = () => {
    window.location = "/";
  };
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.token);
  const [modalDelete, setModalDelete] = useState(false);
  console.log(story);
  const title = story.title && story?.title?.replace(/\s/g, "-").substring(0, 60);
  return (
    <div
      key={story.story_id}
      className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6"
    >
      <DeleteModal
        toggleDelete={toggleDelete}
        modalDelete={modalDelete}
        auth={auth}
        title={title}
        type={"story"}
        url={`userApi/page/story?story_id=${story.story_id}`}
        redirect={redirect}
      />
      {/* <Link href={"/story/" + story.story_id + "/" + title}> */}
        <a>
        
        <div className="related-articles-box">
          <div className="card">
              <div className="post-card-avtar-info">
                <div className="post-card-avtar-left">
                  <div className="post-card-avtar-image">
                    <img src={story.avatar ? story.avatar : '/post-card-avtar-image-1.png'} alt="" />
                  </div>
                  <h3>{story.username} <span>{moment(story.created_at).format("MMMM Do YYYY")}{" "}</span>
                  </h3>
                </div>
                <div className="post-card-avtar-right">
                  {auth.user.user_id==story.user_id && (
                    <div className="btn-group btn-group-sm special">
                        <a href="#" className="drop dropdown-btn" data-toggle="dropdown">
                          <img src="/three-dots.png" alt="" /></a>
                        <ul className="dropdown-menu dropdown-menu__box">
                        <li className="drop-down__item">
                          <Link href={{ pathname: "/story/edit/[id]", query: { id: story.story_id } }}>
                          <a className="report" href="# ">Edit</a>
                          </Link>
                          </li>
                          <li className="drop-down__item"><a href="#" onClick={() => toggleDelete(story.story_id)}>Delete</a></li>
                        </ul>
                    </div>
                    )}
                    {auth.user.user_id!=story.user_id && (
                    <div className="btn-group btn-group-sm special">
                        <a href="#" className="drop dropdown-btn" data-toggle="dropdown">
                          <img src="/three-dots.png" alt="" /></a>
                        <ul className="dropdown-menu dropdown-menu__box">
                          <ReportModelNew
                              story={story}
                          />
                        </ul>
                    </div>
                    )}
                </div>
              </div>
              <Link href={"/story/" + story.story_id + "/" + story?.title?.replace(/\s/g, "-").substring(0, 60)}>
                <div className="post-card-avtar-content">
                  <h4>{story.community_title}</h4>
                  <p>{story.title}</p>
                </div>
              </Link>
              <div className="related-articles-box">
                <div className="text-box"></div>
                <div className="image-holder">
                  <img src={story.post_thumbnail} alt="postImage" className="img-fluid content-image cropped" />
                </div>
                <div className="post-card-option">
                  <div className="post-card-option-left">
                    <ul>
                      <li>
                      <Link href={"/story/" + story.story_id + "/" + story?.title?.replace(/\s/g, "-").substring(0, 60)}>
                        <a href="#">
                            <span>
                              <img src="/post-card-comment-icon.png" alt="" />
                            </span>
                            {story.total_comments}
                        </a>
                      </Link>
                      </li>
                      {/* <li>
                        <a href="#">
                          <span>
                            <img src="/icon2.svg" alt="" />
                          </span> 50 </a>
                      </li> */}
                      <li><StoryLikes
                          story_id={story.story_id}
                          total_likes={story.total_likes}
                          auth={auth}
                      /></li>
                      {/* <li>
                        <a href="#">
                          <span>
                            <img src="/post-card-love-icon.png" alt="" />
                          </span> 80 </a>
                      </li> */}
                    </ul>
                  </div>
                  <div className="post-card-option-right">
                    <ul>
                      <li>
                        <a href="#">
                          <span>
                            <img src="/post-card-followed-icon.png" alt="" />
                          </span>
                        </a>
                      </li>
                      {/* <li>
                        <a href="#">
                          <span>
                            <img src="/post-card-share-icon.png" alt="" />
                          </span>
                        </a>
                      </li> */}
                      <StoryShareModelNew
                                       story={story}
                                    />
                    </ul>
                  </div>
                </div>
              </div>
          </div>
            {/* <div className="image-holder">
              <img
                src={story.post_thumbnail}
                alt="postImage"
                className="img-fluid content-image cropped"
              />
            </div> */}
            {/* <div className="text-box">
              <h4>{story.community_title}</h4>
              <span>
                <strong>{story.username}</strong>
              </span>
              <p>{story.title}</p>
             
            </div> */}
          </div>
        </a>
      {/* </Link> */}
    </div>
  );
};
export default SearchStory;
