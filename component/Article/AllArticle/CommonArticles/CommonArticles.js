/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
const CommonArticles = ({ articles }) => {
  return (
    <div>
      <div className="row">
        {articles?.map((article) => (
          // <div
          //   key={article.article_id}
          //   className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6"
          // >

          <div
            key={article.article_id}
            className="col-lg-4 col-md-6"
          >
            <Link href={{pathname: "/article/[id]", query: {id: article.article_id}}}>
              <a>
                <div className="related-articles-box">
                <div className="text-box">
                    <h4>{article.community_title}</h4>
                    <div className="d-flex align-items-center justify-content-between">
                      <span>
                      By: {article.username}
                    </span>
                    <span>
                    
                        Source:{" "}
                        <a href="#">
                        {article?.source_text?.match(/(?:www\.)?(\w*)\./)[1]}
                        </a>
                    
                    </span>
                    </div>
                    <p>{article?.title?.slice(0, 35)}...</p>
                  </div>
                  <div className="image-holder">
                    <img
                      src={article.img_link}
                      alt="articleImage"
                      className="img-fluid content-image cropped"
                    />
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommonArticles;
