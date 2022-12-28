/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import HeadData from "../component/HeadData";
import { getFetchData, postData } from "../utils/api-client";
import { notifyError, notifyLoading } from "../store/notify/action";
import PreloaderLg from "../component/Preloader/PreloaderLg";
import NormalPreloader from "../component/Preloader/NormalPreloader";

const PostArticle = () => {
  const router = useRouter();
  const auth = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const log = localStorage.getItem("loggedIn");
    if (!log) return router.push("/login");
  }, []);

  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();

  const [load, setLoad] = useState(false);
  const [articleData, setArticleData] = useState(null);
  const [url, setUrl] = useState(null);
  const getArticle = async (url) => {
    const urlCheck =
      /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!urlCheck.test(url)) return dispatch(notifyError("Url is not valid."));
    setLoad(true);
    const data = await getFetchData(`articleApi/post?url=${url}`, token);

    setLoad(false);
    if (data.err) return dispatch(notifyError(data.err));
    setArticleData(data);
    executeScroll();
  };

  const [communityId, setCommunityId] = useState(null);
  const [success, setSucccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (articleData) {
      const data = {
        title: articleData.ogTitle,
        communityId: communityId,
        source_text: articleData.ogUrl,
        img_link: articleData.ogImage
          ? articleData.ogImage
          : `${process.env.BASE_URL}/pre-login-banner-img.png`,
        description: articleData.ogDescription,
        url: articleData.ogUrl,
        user_id: auth.user_id,
        name: auth.username,
        email: auth.email,
      };
      if (!data.communityId)
        return dispatch(notifyError("Please select a Category."));
      dispatch(notifyLoading(true));
      const submit = await postData(`articleApi/post`, data, token);
      dispatch(notifyLoading(false));
      if (submit.err) return dispatch(notifyError(submit.err));
      if (submit.success) return postSuccess(submit.data.redirect);
    }
  };

  const postSuccess = (url) => {
    router.push(url);
  };
  if (auth.loading) return <PreloaderLg />;
  return auth.user_id ? (
    <div>
      <HeadData />

      <section className="post-story-sec">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="post-story-inner">
                <h3>Enter the link of the article you want to post</h3>
                <p className="post-story__content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Tincidunt non ullamcorper fusce purus integer. At semper ac eget lacus dolor risus sed ac.
                   Duis at arcu a bibendum nullam praesent fermentum id at. Gravida vulputate ut urna ac a quisque tincidunt</p>
                <form onSubmit={handleSubmit}>
                  {load ? (
                    <NormalPreloader />
                  ) : (
                    !articleData?.ogTitle && (
                      <>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Article Link</label>
                              <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setUrl(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="form-group text-center">
                          <button
                            className="post-btn preview-article"
                            onClick={() => getArticle(url)}
                          >
                            Post Article
                          </button>
                        </div>
                      </>
                    )
                  )}

                  <div className="row">
                    {articleData && (
                      <div className="col-md-4">
                        <a href="#">
                          <div className="related-articles-box" ref={myRef}>
                            <div className="image-holder">
                              <img
                                src={
                                  articleData.ogImage
                                    ? articleData.ogImage
                                    : `http://localhost:3000/pre-login-banner-img.png`
                                }
                                alt=""
                                className="img-fluid"
                                name="image"
                              />
                            </div>
                            <div className="text-box">
                              <h4>{articleData.ogTitle}</h4>
                              <span>{articleData.ogUrl}</span>
                              <p>{articleData.ogDescription}</p>
                            </div>
                          </div>
                        </a>
                      </div>
                    )}
                  </div>

                  {articleData && (
                    <>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Select Category</label>
                            <select
                              name="communityId"
                              onChange={(e) => setCommunityId(e.target.value)}
                              className="form-control"
                            >
                              <option>Select Community</option>
                              <option value="3">Eating Disorder</option>
                              <option value="4">Weight Issues</option>
                              <option value="5">Heart Diseases</option>
                              <option value="6">Anxiety</option>
                              <option value="7">Depression</option>
                              <option value="1">Drug Addiction</option>
                              <option value="8">Insecurity</option>
                              <option value="9">Mental Health</option>
                              <option value="10">Stress</option>
                              <option value="2">Alchohol Addiction</option>
                              <option value="11">Smoking</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <button className="post-btn" type="submit">
                          Post Article
                        </button>
                      </div>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  ) : (
    <PreloaderLg />
  );
};

export default PostArticle;
