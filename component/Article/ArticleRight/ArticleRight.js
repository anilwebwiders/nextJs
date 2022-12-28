import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getAll } from "../../../utils/api-client";
import Preloader from "../../Preloader/Preloader";

const ArticleRight = ({ articlePage, type }) => {
  const [load, setLoad] = useState(false);
  const [allArticle, setAllArticle] = useState([]);

  const getArticle = useCallback(async () => {
    setLoad(true);
    const data = await getAll(`articleApi/sidebar/${type}?page=${articlePage}`);
    setAllArticle(data.data);

    setLoad(false);
  }, [articlePage, type]);

  useEffect(() => {
    getArticle();
  }, [getArticle]);

  return (
    <div className="article-left-right">
      <div className="article-stories">
        <div className="title">
          <h3>ARTICLES</h3>
          <Link href="/articles">
            <a>View all</a>
          </Link>
        </div>
      <div className="story">
        {load ? (
          <div className="article-stories-box">
            <span className="text-center">
              <Preloader />
            </span>
          </div>
        ) : (
          allArticle?.map((art) => (
            <div key={art.article_id} className="article-stories-box">
              <Link href={/article/ + art.article_id}>
                <a className="heart-icon">
                  <h3>{art.title.substring(0, 60)}...</h3>
                  <a href="#" class="like-icon love-like-icon"></a>
                </a>
              </Link>
              <div class="article-box-info">
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
              {/* <span>{art.community_title}</span>
              <h4>
                Source:{" "}
                {art.source_text &&
                  art.source_text.match(/(?:www\.)?(\w*)\./)[1]}
              </h4>
              <p>
                {art.description && art.description.substring(0, 150)}
                ...
              </p> */}
              {/* <div className="text-start">
                <Link href={/article/ + art.article_id}>
                  <a arrow-btn>Read more</a>
                </Link>
              </div> */}
            </div>
            
          ))
        )}
      </div>
      </div>
      <div class="tag-box">
                     <h2>Tags</h2>
                     <ul>
                        <li><a href="#">Anxiety</a></li>
                        <li><a href="#">Depression</a></li>
                        <li><a href="#">Heart Disease</a></li>
                        <li><a href="#">Alchohol</a></li>
                        <li><a href="#">Insecurity</a></li>
                        <li><a href="#">Eating Disorder</a></li>
                        <li><a href="#">Mental Health</a></li>
                        <li><a href="#">Alchohol Addiction</a></li>
                     </ul>
                  </div>
    </div>
  );
};

export default ArticleRight;
