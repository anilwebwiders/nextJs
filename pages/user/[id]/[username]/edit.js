/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeadData from "../../../../component/HeadData";
import UploadImage from "../../../../component/User/UploadImage";
import {
  notifyError,
  notifyLoading,
  notifySuccess,
} from "../../../../store/notify/action";
import { getFetchData, patchData } from "../../../../utils/api-client";

import NormalPreloader from "../../../../component/Preloader/NormalPreloader";
import ChangePassword from "../../../../component/Modal/ChangePassword/ChangePassword";
import Accept from "../../../../component/Modal/Accept";
import PreloaderLg from "../../../../component/Preloader/PreloaderLg";
import { useRouter } from "next/dist/client/router";

const Edit = () => {
  const auth = useSelector((state) => state.auth);
  const router = useRouter()
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);
  const getUser = async () => {
    setLoad(true);
    const user = await getFetchData(`userApi/${auth.user.user_id}`, auth.token);
    setLoad(false);
    if (user.error) return dispatchEvent(notifyError(user.error));
  };
  useEffect(() => {
    if (auth.user.user_id) {
      getUser();
    }
  }, [auth.user.user_id]);

  const initialState = {
    user_id: auth.user.user_id,
    full_name: auth.user.full_name,
    email: auth.user.email,
    username: auth.user.username,
    about: auth.user.about,
    avatar: auth.user.avatar,
  };

  const [user, setUser] = useState([]);
  useEffect(() => {
    setUser(initialState);
  }, [auth]);
  const { full_name, email, username, about, avatar, user_id } = user;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const [uploadedImage, setUploadedImage] = useState(null);
  const [reload, setReload] = useState(false);
  const [useAv, setUseAv] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postedData = {
      ...user,
      image: useAv ? '/avatar.png' : uploadedImage ? uploadedImage : avatar,
      user_id: auth.user.user_id,
    };
    //console.log("🚀 ~ file: edit.js:68 ~ handleSubmit ~ ", postedData)
    dispatch(notifyLoading(true));
    const data = await patchData(`userApi/update`, postedData, auth.token);
    dispatch(notifyLoading(false));
    if (data.err) return dispatch(notifyError(data.err));
    if (data.success) dispatch(notifySuccess("Successfully Updated"));
    if (data.success) return setReload(true);
  };

  useEffect(() => {
    if (reload) router.reload();
  }, [reload]);

  const [loadPass, setLoadPass] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setLoadPass(false)
    setModal(!modal)
  };
  const [modalAccept, setModalAccept] = useState(false);
  const toggleAccept = () => setModalAccept(!modalAccept);
  if (auth.loading) return <PreloaderLg />;
  if (auth.user.user_id) {
    return (
      <div>
        <HeadData />
        <div className="wrapper edit_profile">
        <div className="innerbanner__img" id="imagePreview2">
      
          </div>
          <section className="profile-sec profile-edit">
            <div className="container-fluid">
              <div className="my-profile my-profile-border-bottom">
                
                <div className="Edit_profile_img">
                <div className="profile d-flex align-items-center justify-content-between">
                    <UploadImage setUploadedImage={setUploadedImage} getUser={getUser} />
                    </div>
                </div>

                <Accept
                  toggleAccept={toggleAccept}
                  modalAccept={modalAccept}
                  auth={auth}
                  title={"Delete Your Profile"}
                />
                <ChangePassword
                  modal={modal}
                  loadPass={loadPass}
                  setLoadPass={setLoadPass}
                  toggle={toggle}
                  auth={auth}
                />

                
                <div className="edit_form">
                  <div className="d-flex align-items-center justify-content-between mt-3">
                <h3 className="mr-5">Edit your profile</h3>
                <div className="btn-group mt-md-0 mt-4">
                      <a
                        className="delete-btn ml-md-4 mr-4"
                        onClick={toggleAccept}
                      >
                        Delete Profile
                      </a>
                      {/* <a className="reset-btn ml-2" onClick={toggle}> */}
                      <a className="reset-btn ml-2" href="/change-password">
                        Change Password
                      </a>
                    </div>
                    </div>

                  {load ? (
                    <NormalPreloader />
                  ) : (
                    <form className="profile-edit-form" onSubmit={handleSubmit}>
                      {/* <UploadImage setUploadedImage={setUploadedImage} getUser={getUser} /> */}
                      <div className="row">
                      <div className="col-md-6">
                      <div className="form-group form-control__box">
                        <label>First Name</label>
                        <input
                          name="full_name"
                          type="text"
                          className="form-control"
                          defaultValue={full_name}
                          onChange={handleChangeInput}
                        />
                      </div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group form-control__box">
                        <label>Last Name</label>
                        <input
                          name="full_name"
                          type="text"
                          className="form-control"
                          defaultValue={full_name}
                          onChange={handleChangeInput}
                        />
                      </div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group form-control__box">
                        <label>Email</label>
                        <input
                          name="email"
                          type="email"
                          defaultValue={email}
                          className="form-control"
                          onChange={handleChangeInput}
                        />
                      </div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group form-control__box">
                        <label>Subject</label>
                        <input
                          name="Subject"
                          type="text"
                          placeholder="@_leena250"
                          defaultValue={username}
                          className="form-control"
                          onChange={handleChangeInput}
                        />
                      </div>
                      </div>
                      <div className="col-md-12">
                      <div className="form-group form-control__box">
                        <label>Message</label>
                        <textarea
                          name="about"
                          placeholder="write message here...."
                          defaultValue={about && about.replace(/%comma%/g, "'")}
                          onChange={handleChangeInput}
                          type="text"
                          className="form-control"
                        />
                      </div>
                      </div>
                    </div>  
                      <div className="form-group mb-3">
                         <input
                            name="check"
                            type="checkbox"
                            onChange={() => setUseAv(!useAv)}
                          />
                        <label className="check">
                          Use default avatar
                        </label>
                      </div>
                      <div className="">
                        <button className="btn-send" type="submit">
                          Update Profile
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  } else {
    return <PreloaderLg />;
  }
};

export async function getServerSideProps({ query }) {
  return {
    props: { user: [] }, // will be passed to the page component as props
  };
}

export default Edit;
