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
        <div class="row">
                  <div class="col-lg-12">
                      <div class="post-article">
                        <img src="/post-article-img.jpg" class="post-article-img" alt=""/>
                        <h3 class="post-article__titel">The Top 25 Mental Health Articles</h3>
                        <div class="source">Source: <a href="#">https://www.psycom.net/mental-health-wellbeing/top-25--articles</a></div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Semper est sagittis, eget nec donec feugiat. Mi adipiscing in enim integer. Ut rhoncus euismod semper eget at sapien tincidunt. Tellus nunc a, orci bibendum in neque, hac lacus commodo. Sit adipiscing elementum</p>
                        <div class="post-form">
                            <label className="select">Select Community Categories</label>
                            <div class="select-box"><select class="dropdownpost">
                                <option>Select Community</option>
                            </select></div>
                        </div>
                        <div class="post-article-link-form-button">
                            <button class="btn-send">Post Article</button>
                        </div>
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
