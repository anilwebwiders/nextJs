import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeadData from "../../../../component/HeadData";
import Preloader from "../../../../component/Preloader/Preloader";
import PreloaderLg from "../../../../component/Preloader/PreloaderLg";
import {
  emailNotificationsStory,
  emailNotificationsArticle,
  emailNotificationsOther,
} from "../../../../store/consts/notifactions";
import {
  notifyError,
  notifyLoading,
  notifySuccess,
} from "../../../../store/notify/action";
import { getFetchData, patchData } from "../../../../utils/api-client";
import NotFound from "../../../404";

const NotificationSettings = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [load, setLoad] = useState(false);

  const [mainNoti, setMaiNoti] = useState([]);
  const [emailSet, setEmailSet] = useState([]);
  const getSettings = useCallback(async () => {
    if (auth.token) {
      setLoad(true);
      const data = await getFetchData(
        `userApi/notification/settings?user_id=${auth.user.user_id}`,
        auth.token
      );
      setMaiNoti(data.main[0]);
      setEmailSet(data.email[0]);
      setLoad(false);
    }
  }, [auth]);

  useEffect(() => {
    getSettings();
  }, [getSettings]);

  const [noti, setNoti] = useState([]);

  useEffect(() => {
    setNoti({
      story_likes: emailSet.story_likes,
      story_comments: emailSet.story_comments,
      story_post: emailSet.story_post,
      article_likes: emailSet.article_likes,
      article_comments: emailSet.article_comments,
      article_post: emailSet.article_post,
      followers: emailSet.followers,
      subscription: emailSet.subscription,
      following: emailSet.following,
      main_story_likes: mainNoti.main_story_likes,
      main_story_comments: mainNoti.main_story_comments,
      main_story_post: mainNoti.main_story_post,
      main_article_likes: mainNoti.main_article_likes,
      main_article_comments: mainNoti.main_article_comments,
      main_article_post: mainNoti.main_article_post,
      main_followers: mainNoti.main_followers,
      main_subscription: mainNoti.main_subscription,
      main_following: mainNoti.main_following,
    });
  }, [emailSet, mainNoti]);

  const handleCheck = (e) => {
    const { name, checked } = e.target;
    setNoti({ ...noti, [name]: checked === false ? 0 : 1 });
  };
  const submit = async (e) => {
    e.preventDefault();
    dispatch(notifyLoading(true));
    const data = await patchData(
      "userApi/notification/settings",
      { ...noti, user_id: auth.user.user_id },
      auth.token
    );
    dispatch(notifyLoading(false));
    if (data.err) return dispatch(notifyError(data.err));
    if (data.success) return dispatch(notifySuccess(data.success));
  };

  if (auth.loading) return <PreloaderLg />;
  if (auth.user.user_id) {
    return (
      <div className="profile-sec notification-settings">
        <HeadData />
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 col-md-12">
              <div className="section-title">
                <h3>FNMotivation Notification Settings</h3>
              </div>
            </div>
            {load ? (
                <PreloaderLg />
              ) : (
            <form onSubmit={submit}>
            <div class="notifications-settings-wrap">
                        <div class="notifications-settings-item">
                            <h3 class="notifications-settings-item__titel">Platform Notification Settings</h3>
                            <div class="story-post">
                              <h3 class="story-post-titel">Story Post</h3>
                              {Object.entries(mainNoti)
                        .slice(0, 3)
                        .map(([key, value]) => {
                          return (
                            <>
                              <li className="form-group" key={key}>
                                {emailNotificationsStory[key]}
                                <label className="notification-switch">
                                  <input
                                    type="checkbox"
                                    defaultChecked={value == 1}
                                    onChange={handleCheck}
                                    name={key}
                                    className="default"
                                  />
                                  <span className="switch round"></span>
                                </label>
                              </li>
                            </>
                          );
                        })}
                              <h3 class="story-post-titel">Article Post</h3>
                              {Object.entries(mainNoti)
                        .slice(3, 6)
                        .map(([key, value]) => {
                          return (
                            <>
                              <li className="form-group" key={key}>
                                {emailNotificationsArticle[key]}
                                <label className="notification-switch">
                                  <input
                                    type="checkbox"
                                    defaultChecked={value == 1}
                                    onChange={handleCheck}
                                    name={key}
                                    className="default"
                                  />
                                  <span className="switch round"></span>
                                </label>
                              </li>
                            </>
                          );
                        })}
                             {Object.entries(mainNoti)
                        .slice(6, 9)
                        .map(([key, value]) => {
                          return (
                            <>
                              <li className="form-group title" key={key}>
                                {emailNotificationsOther[key]}
                                <label className="notification-switch">
                                  <input
                                    type="checkbox"
                                    defaultChecked={value == 1}
                                    onChange={handleCheck}
                                    name={key}
                                    className="default"
                                  />
                                  <span className="switch round"></span>
                                </label>
                              </li>
                            </>
                          );
                        })}
                           </div>
                        </div>
                        <div class="notifications-settings-item">
                           <h3 class="notifications-settings-item__titel">Email Notification Settings</h3>
                           <div class="story-post">
                             <h3 class="story-post-titel">Story Post</h3>
                             {Object.entries(mainNoti)
                        .slice(0, 3)
                        .map(([key, value]) => {
                          return (
                            <>
                              <li className="form-group" key={key}>
                                {emailNotificationsStory[key]}
                                <label className="notification-switch">
                                  <input
                                    type="checkbox"
                                    defaultChecked={value == 1}
                                    onChange={handleCheck}
                                    name={key}
                                    className="default"
                                  />
                                  <span className="switch round"></span>
                                </label>
                              </li>
                            </>
                          );
                        })}
                             <h3 class="story-post-titel">Article Post</h3>
                             {Object.entries(mainNoti)
                        .slice(3, 6)
                        .map(([key, value]) => {
                          return (
                            <>
                              <li className="form-group" key={key}>
                                {emailNotificationsArticle[key]}
                                <label className="notification-switch">
                                  <input
                                    type="checkbox"
                                    defaultChecked={value == 1}
                                    onChange={handleCheck}
                                    name={key}
                                    className="default"
                                  />
                                  <span className="switch round"></span>
                                </label>
                              </li>
                            </>
                          );
                        })}
                             {Object.entries(mainNoti)
                        .slice(6, 9)
                        .map(([key, value]) => {
                          return (
                            <>
                              <li className="form-group title" key={key}>
                                {emailNotificationsOther[key]}
                                <label className="notification-switch">
                                  <input
                                    type="checkbox"
                                    defaultChecked={value == 1}
                                    onChange={handleCheck}
                                    name={key}
                                    className="default"
                                  />
                                  <span className="switch round"></span>
                                </label>
                              </li>
                            </>
                          );
                        })}
                          </div>
                       </div>
                    </div>

                    <div className="pt-md-4 pt-lg-5 text-center">
                    <button className="btn-send" type="submit">
                      Save Settings
                    </button>
                  </div>
                </form>
                )}
            {/* <div className="offset-lg-1 col-lg-6 col-md-8 col-xl-5">
              {load ? (
                <PreloaderLg />
              ) : (
                <form onSubmit={submit}>
                  
                  <div className="section-sub-title">
                    <h4 className="mt-5">Platform Notification Settings</h4>
                  </div>

                  <div className="notification-setting-switch">
                    <ul className="mt-4 pl-3">
                      <li className="form-group title">Story Post</li>
                      {Object.entries(mainNoti)
                        .slice(0, 3)
                        .map(([key, value]) => {
                          return (
                            <>
                              <li className="form-group" key={key}>
                                {emailNotificationsStory[key]}
                                <label className="notification-switch">
                                  <input
                                    type="checkbox"
                                    defaultChecked={value == 1}
                                    onChange={handleCheck}
                                    name={key}
                                    className="default"
                                  />
                                  <span className="switch round"></span>
                                </label>
                              </li>
                            </>
                          );
                        })}
                      <li className="form-group title">Article Post</li>
                      {Object.entries(mainNoti)
                        .slice(3, 6)
                        .map(([key, value]) => {
                          return (
                            <>
                              <li className="form-group" key={key}>
                                {emailNotificationsArticle[key]}
                                <label className="notification-switch">
                                  <input
                                    type="checkbox"
                                    defaultChecked={value == 1}
                                    onChange={handleCheck}
                                    name={key}
                                    className="default"
                                  />
                                  <span className="switch round"></span>
                                </label>
                              </li>
                            </>
                          );
                        })}

                      {Object.entries(mainNoti)
                        .slice(6, 9)
                        .map(([key, value]) => {
                          return (
                            <>
                              <li className="form-group title" key={key}>
                                {emailNotificationsOther[key]}
                                <label className="notification-switch">
                                  <input
                                    type="checkbox"
                                    defaultChecked={value == 1}
                                    onChange={handleCheck}
                                    name={key}
                                    className="default"
                                  />
                                  <span className="switch round"></span>
                                </label>
                              </li>
                            </>
                          );
                        })}
                    </ul>
                  </div>

                  <hr className="notification-setting-divider mt-5 mb-5" />
                  EMail Notification

                  <div className="section-sub-title">
                    <h4 className="mt-5">Email Notification Settings</h4>
                  </div>

                  <div className="notification-setting-switch">
                    <ul className="mt-4 pl-3">
                      <li className="form-group title">Story Post</li>
                      {Object.entries(emailSet)
                        .slice(0, 3)
                        .map(([key, value]) => {
                          return (
                            <>
                              <li className="form-group" key={key}>
                                {emailNotificationsStory[key]}
                                <label className="notification-switch">
                                  <input
                                    type="checkbox"
                                    defaultChecked={value == 1}
                                    onChange={handleCheck}
                                    name={key}
                                    className="default"
                                  />
                                  <span className="switch round"></span>
                                </label>
                              </li>
                            </>
                          );
                        })}
                      <li className="form-group title">Article Post</li>
                      {Object.entries(emailSet)
                        .slice(3, 6)
                        .map(([key, value]) => {
                          return (
                            <>
                              <li className="form-group" key={key}>
                                {emailNotificationsArticle[key]}
                                <label className="notification-switch">
                                  <input
                                    type="checkbox"
                                    defaultChecked={value == 1}
                                    onChange={handleCheck}
                                    name={key}
                                    className="default"
                                  />
                                  <span className="switch round"></span>
                                </label>
                              </li>
                            </>
                          );
                        })}

                      {Object.entries(emailSet)
                        .slice(6, 9)
                        .map(([key, value]) => {
                          return (
                            <>
                              <li className="form-group title" key={key}>
                                {emailNotificationsOther[key]}
                                <label className="notification-switch">
                                  <input
                                    type="checkbox"
                                    defaultChecked={value == 1}
                                    onChange={handleCheck}
                                    name={key}
                                    className="default"
                                  />
                                  <span className="switch round"></span>
                                </label>
                              </li>
                            </>
                          );
                        })}
                    </ul>
                  </div>

                  <div className="pt-md-4 pt-lg-5">
                    <button className="theme-btn mt-5" type="submit">
                      Save Settings
                    </button>
                  </div>
                </form>
              )}
            </div> */}
          </div>
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
};

export default NotificationSettings;
