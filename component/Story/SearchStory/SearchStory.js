/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
const SearchStory = ({ story }) => {
  const title = story.title && story?.title?.replace(/\s/g, "-").substring(0, 60);
  return (
    <div
      key={story.story_id}
      className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6"
    >
      <Link href={"/story/" + story.story_id + "/" + title}>
        <a>
          <div className="related-articles-box">
          <div class="card"><a href="/story/144/Feeling-better-"><div class="post-card-avtar-info">
            <div class="post-card-avtar-left">
              <div class="post-card-avtar-image">
              <img src="/post-card-avtar-image-1.png" alt=""/></div>
              <h3>{story.username}<span>4/22/2022</span></h3>
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
                        <h4>{story.community_title}</h4><p>{story.title}</p></div><div class="related-articles-box">
                          <div class="text-box"></div><div class="image-holder">
                            <img src={story.post_thumbnail}
                alt="postImage"
                className="img-fluid content-image cropped"/>
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
      </Link>
    </div>
  );
};
export default SearchStory;
