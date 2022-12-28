/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from "next/link";

const UserSearch = ({user}) => {
    return (
        <div className="related-articles text-center">
          <div className='container-fluid'>
        <div className="row">
            {user.map(user =>
                // <div key={user.user_id} className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6">
                <div key={user.user_id} className="col-md-4 col-lg-3">
                    <Link href={"/user/" + user.user_id + "/" + user.username}>
                        <a>
                        <div className="related-articles-box mx-auto container-fluid">
                        <div class="user-item">
                          <div class="three-dots">
                           <div class="btn-group btn-group-sm special">
                              <a href="#" class="drop dropdown-btn" data-toggle="dropdown">
                                <img src="/three-dots.png" alt=""/></a>
                              <ul class="dropdown-menu dropdown-menu__box">
                                <li class="drop-down__item"><a href="#">abc</a></li>
                                <li class="drop-down__item"><a href="#">abc</a></li>
                              </ul>
                           </div>
                           </div>
                          
                          <div class="user-body">
                            <div class="user-img">
                            <img src="/post-card-avtar-image-1.png" alt=""/>
                              {/* <img src={user.avatar} alt="userImage" className="img-fluid content-image cropped rounded-circle"/> */}
                              </div>
                            <div class="user-content">
                                <h3>{user.full_name}</h3>
                                <span>@{user.username}</span>
                            </div>
                            <div class="user-posts">
                                <div class="user-posts__left">251 Posts</div>
                                <div class="user-posts__right">25412 Followers</div>
                            </div>
                          </div>
                          <div class="user-item__footer">
                            <a href="#" class="btn__footer-user">Connect</a>
                          </div>          
                        </div>
                            {/* <div className="image-holder">
                                    <img src={user.avatar} alt="userImage" className="img-fluid content-image cropped rounded-circle" /> 
                            </div> */}
                            {/* <div className="text-box">
                                <h4>{user.full_name}</h4>
                                <span><strong>{user.username}</strong></span> */}
                                {/* <p>{story.title}</p> */}
                                {/* <p>{story.short_story === 'null' ? <div>{story.body.substring(0, 65).replace(/<\/?[a-zA-Z]+>/gi,'').replace('&nbsp;', ' ')}</div> : story.short_story.substring(0, 25)}</p> */}
                            {/* </div> */}
                        </div>
                        </a>
                    </Link>
                </div>)}
        </div>
        </div>
    </div>
    );
};

export default UserSearch;