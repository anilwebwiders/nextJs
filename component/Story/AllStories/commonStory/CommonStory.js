/* eslint-disable @next/next/no-img-element */
import React, { useState,useEffect } from "react";
import Link from "next/link";
import StoryLikes from "../../StoryDetails/StoryDetialsElem/StoryLikes";
import { useDispatch,useSelector } from "react-redux";
import { notifyError, notifySuccess } from "../../../../store/notify/action";
import StoryShareModelNew from "../../StoryDetails/StoryDetialsElem/StoryShareModelNew";
import ReportModelNew from "../../StoryDetails/StoryDetialsElem/ReportModelNew";
import { deleteData, getFetchData } from "../../../../utils/api-client";
import DeleteModal from "../../../../component//Modal/Delete/DeleteModal";
const CommonStory = ({ story,title }) => {
  
   const auth = useSelector((state) => state.auth);
   const token = useSelector((state) => state.auth.token);
   const [modalDelete, setModalDelete] = useState(false);
  const redirect = () => {
    window.location = "/";
  };
   const [id, setId] = useState(null);
     const toggleDelete = (id) => {
       setModalDelete(!modalDelete);
       setId(id);
     };
   const [open, setOpen] = useState(false);
   const toggle = (s) => setOpen(!open);
   const dispatch = useDispatch();
   const [banLoader, setBanLoader] = useState(null);
   const deleteStory = async (id) => {
    setBanLoader(id);
    const data = await deleteData(`userApi/page/story?story_id=${id}`, token);
    setBanLoader(null);
    if (data.err) return dispatch(notifyError(data.err));
    if (data.success) return dispatch(notifySuccess("Deleted Successfully"));
  };
   return (

      <div className="related-articles">
      <DeleteModal
        toggleDelete={toggleDelete}
        modalDelete={modalDelete}
        auth={auth}
        title={title}
        type={"story"}
        url={`userApi/page/story?story_id=${id}`}
        redirect={redirect}
      />
         <div className="row">

            {story?.map(story =>
               // <div key={story.story_id} className="col-xl-6 col-lg-6 col-md-6 col-6">
               <div key={story.story_id} className="col-sm-12 col-lg-6 col-md-12">
                  <div className="card">

                     <>
                        <div className="post-card-avtar-info">
                           <div className="post-card-avtar-left">
                              <div className="post-card-avtar-image">
                              <picture>
                                 <img src={story.avatar ? story.avatar : '/post-card-avtar-image-1.png'} alt="" /></picture></div>
                              <h3>{story.username}<span>4/22/2022</span></h3>
                           </div>

                           <div className="post-card-avtar-right">
                              <a href="#" className="love-like">
                                 <img src="/love-like-icon.svg" alt="" /></a>
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
                              <a href="#">{story.community_title}</a>
                              <p>{story.title}</p>
                           </div>
                        </Link>
                        <div className="related-articles-box">
                           <div className="text-box">
                              {/* <h4>{story.community_title}</h4>
                                <span><strong>{story.username}</strong></span>
                                <p>{story.title}</p> */}
                              {/* <p>{story.short_story === 'null' ? <div>{story.body.substring(0, 65).replace(/<\/?[a-zA-Z]+>/gi,'').replace('&nbsp;', ' ')}</div> : story.short_story.substring(0, 25)}</p> */}
                           </div>
                           <div className="image-holder">
                           <picture>
                              <img src={story.post_thumbnail} alt="postImage" className="img-fluid content-image cropped" />
                              </picture>

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
                                    <li><a href="#"><span><img src="/post-card-clap-icon.png" alt="" /></span> {story.total_stories}</a></li>
                                    <li><StoryLikes
                                       story_id={story.story_id}
                                       total_likes={story.total_likes}
                                       auth={auth}
                                    /></li>
                                 </ul>
                              </div>
                              <div className="post-card-option-right">
                                 <ul>
                                    <li><a href="#"><span><img src="/post-card-followed-icon.png" alt="" /></span></a></li>

                                    <StoryShareModelNew
                                       story={story}
                                    />

                                 </ul>
                              </div>
                           </div>


                        </div>
                     </>

                  </div>
               </div>)}
         </div>
      </div>
   );
};

export default CommonStory;