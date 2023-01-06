/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
const CustomArticles = ({ articles }) => {
  return (
    <div>
      <div className="row articles-wrap">
        {articles?.map((art) => (
          <div
            key={art.article_id}
            className="col-lg-4 col-md-6"
          >

          <div key={art.article_id} className="articles-item article-stories-box">
              <Link href={/article/ + art.article_id}>
                <a className="heart-icon">
                  <h3>{art.title.substring(0, 60)}...</h3>
                  <a href="#" className="like-icon love-like-icon"></a>
                </a>
              </Link>
              <div className="article-box-info">
                           <ul>
                              <li><a href="#">{art.community_title}</a></li>
                              <li><p>By:<strong> alberte</strong></p></li>
                              <li><p>{art.source_text && 
                              art.source_text.match(/(?:www\.)?(\w*)\./)[1]}</p></li>
                              <li><p><strong>4/22/2022</strong></p></li>
                           </ul>
                           <h5>{art.description && art.description.substring(0, 150)}</h5>
                           <div className="text-start">
                              <Link href={/article/ + art.article_id}>
                                <a className="arrow-btn">Read more</a>
                              </Link>
                            </div>
                        </div>
              
            </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default CustomArticles;
