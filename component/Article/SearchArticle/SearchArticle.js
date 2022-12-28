/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

const SearchArticle = ({ article }) => {
  return (
    // <div
    //   key={article.article_id}
    //   className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6"
    // >
    <div
      key={article.article_id}
      className="col-lg-4 col-md-6" 
    >
      <Link href={"/article/" + article.article_id}>
        <a>
          <div className="related-articles-box">
          <div class="card"><a href="/story/144/Feeling-better-"><div class="post-card-avtar-info">
            <div class="post-card-avtar-left">
              <div class="post-card-avtar-image">
              <img src="/post-card-avtar-image-1.png" alt=""/></div>
              <h3>{article.username}<p>{article.community_title}</p><span>4/22/2022</span></h3>
              </div><div class="post-card-avtar-right">
                {/* <a href="#" class="love-like"><img src="/love-like-icon.svg" alt=""/></a> */}
                <div class="btn-group btn-group-sm special"><a href="#" class="drop dropdown-btn" data-toggle="dropdown">
                  <img src="/three-dots.png" alt=""/></a><ul class="dropdown-menu dropdown-menu__box">
                    <li class="drop-down__item"><a href="#">abc</a>
                    </li>
                    <li class="drop-down__item">
                      <a href="#">abc</a>
                      </li>
                      </ul>
                      </div>
                      </div>
                      </div>
                      <div class="post-card-avtar-content">
                        <h4>{article.title}</h4><p>{article.title}</p></div><div class="related-articles-box">
                          <div class="text-box"></div><div class="image-holder">
                            <img src={article.img_link} alt="postImage" className="img-fluid content-image cropped"/>
                            </div><div class="post-card-option"><div class="post-card-option-left"><ul><li><a href="#"><span>
                              <img src="/post-card-comment-icon.png" alt=""/>
                              </span> 40</a></li><li><a href="#"><span><img src="/icon2.svg" alt=""/>
                              </span> 50</a></li><li><a href="#"><span><img src="/post-card-love-icon.png" alt=""/>
                              </span> 80</a></li></ul></div><div class="post-card-option-right"><ul><li><a href="#">
                                <span><img src="/post-card-followed-icon.png" alt=""/></span></a></li><li><a href="#">
                                  <span>
              <img src="/post-card-share-icon.png" alt=""/>
            </span>
              </a>
              </li>
              </ul>
              </div>
              </div>
              </div>
              </a>
              </div>
            {/* <div className="image-holder">
              <img
                src={article.img_link}
                alt="postImage"
                className="img-fluid content-image cropped"
              />
            </div> */}
            {/* <div className="text-box">
              <h4>{article.title}</h4>
              <span>
                <strong>{article.community_title}</strong>
              </span>
              <strong className="mt-3">{article.username}</strong>
              <p>{article.title}</p>
            </div> */}
          </div>
        </a>
      </Link>
    </div>
  );
};

export default SearchArticle;
