/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Link from "next/link";
import { useDispatch,useSelector } from "react-redux";
import moment from "moment";
import ReportArticle from "../ArticleDetails/ReportArticle/ReportArticle";
import ArticleLike from "../ArticleDetails/ArticleDetailsElm/ArticleLike";
import ArticleShareModal from "../ArticleDetails/ArticleDetailsElm/ArticleShareModal";
import DeleteModal from "../../Modal/Delete/DeleteModal";
const SearchArticle = ({ article }) => {
  const [id, setId] = useState(null);
  console.log(article);
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.token);
  const [modalDelete, setModalDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const [title, setTitle] = useState(null);
  const toggleDelete = (id, data) => {
    setModalDelete(!modalDelete);
    setId(id);
    setTitle(data);
  };
  const redirect = () => {
    window.location = "/";
  };
  return (
    <>
    <DeleteModal
        toggleDelete={toggleDelete}
        modalDelete={modalDelete}
        auth={auth}
        title={article.title}
        type={"article"}
        url={`userApi/page/article?article_id=${article.article_id}`}
        redirect={redirect}
      />
    
    <div
      key={article.article_id}
      className="col-lg-4 col-md-6" 
    >
      <a>
        <div className="related-articles-box">
          <div className="card">
          
              <div className="post-card-avtar-info">
              <Link href={"/article/" + article.article_id}>
                <div className="post-card-avtar-left">
                <div className="post-card-avtar-image">
                    <img src={article.avatar ? article.avatar : '/post-card-avtar-image-1.png'} alt="" />
                  </div>
                <h3>{article.username} <p>{article.community_title}</p>
                    <span>{moment(article.created_at).format("MMMM Do YYYY")}{" "}</span>
                  </h3>
                </div>
                </Link>
                <div className="post-card-avtar-right">
                  {/* <div className="btn-group btn-group-sm special">
                    <a href="#" className="drop dropdown-btn" data-toggle="dropdown">
                      <img src="/three-dots.png" alt="" />
                    </a>
                    <ul className="dropdown-menu dropdown-menu__box">
                      <li className="drop-down__item">
                        <a href="#">abc</a>
                      </li>
                      <li className="drop-down__item">
                        <a href="#">abc</a>
                      </li>
                    </ul>
                  </div> */}
                  {auth.user.user_id==article.user_id && (
                    <div className="btn-group btn-group-sm special">
                        <a href="#" className="drop dropdown-btn" data-toggle="dropdown">
                          <img src="/three-dots.png" alt="" /></a>
                        <ul className="dropdown-menu dropdown-menu__box">
                        <li className="drop-down__item">
                          <Link href={{ pathname: "/story/edit/[id]", query: { id: article.article_id } }}>
                          <a className="report" href="# ">Edit</a>
                          </Link>
                          </li>
                          <li className="drop-down__item"><a href="#" onClick={() => toggleDelete(article.article_id)}>Delete</a></li>
                        </ul>
                    </div>
                    )}
                    {auth.user.user_id!=article.user_id && (
                    <div className="btn-group btn-group-sm special">
                        <a href="#" className="drop dropdown-btn" data-toggle="dropdown">
                          <img src="/three-dots.png" alt="" /></a>
                        <ul className="dropdown-menu dropdown-menu__box">
                        <ReportArticle
                          article_id={article.article_id}
                          title={article.title}
                          user_id={article.user_id}
                        />
                        </ul>
                    </div>
                    )}
                </div>
              </div>
              <div className="post-card-avtar-content">
                <h4>{article.title}</h4>
                <p>{article.title}</p>
              </div>
              <div className="related-articles-box">
                <div className="text-box"></div>
                <div className="image-holder">
                  <img src={article.img_link} alt="postImage" className="img-fluid content-image cropped" />
                </div>
                <div className="post-card-option">
                  <div className="post-card-option-left">
                    <ul>
                      <li>
                      <Link href={"/article/" + article.article_id}>
                        <a href="#">
                          <span>
                            <img src="/post-card-comment-icon.png" alt="" />
                          </span> {article.total_comments} </a>
                          </Link>
                      </li>
                      {/* <ArticleLike article_id={article.article_id} auth={auth} /> */}
                      
                      <li>
                        <a href="#">
                          <span>
                            <img src="/icon2.svg" alt="" />
                          </span> 50 </a>
                      </li>
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
                      <li>
                        {/* <a href="#">
                          <span>
                            <img src="/post-card-share-icon.png" alt="" />
                          </span>
                        </a> */}
                        <a onClick={toggle}>
                      <img
                        src="/post-card-share-icon.png"
                        className="simple-state"
                        alt=""
                      />
                    </a>
                        {open && (
                          <ArticleShareModal
                            open={open}
                            toggle={toggle}
                            url={`${process.env.BASE_URL}/article/${article.article_id}`}
                            title={article.title}
                          />
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
          </div> 
        </div>
      </a>
    </div>
    </>
  );
};

export default SearchArticle;
