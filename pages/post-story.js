/* eslint-disable @next/next/no-img-element */
import HeadData from "../component/HeadData";
import { useEffect, useRef, useState } from "react";
import PreloaderLg from "../component/Preloader/PreloaderLg";
import { postData, formDataPost } from "../utils/api-client";
import { useDispatch, useSelector } from "react-redux";
import storyValid from "../utils/story/storyValid";
import {
  notifyError,
  notifyLoading,
  notifySuccess,
} from "../store/notify/action";
import { useRouter } from "next/dist/client/router";
import { imageValid } from "../utils/validCheck";
import { useS3Upload } from "next-s3-upload";
import { resizeFile, convertBase64ToFile } from "../utils/imageShrink";
import axios from "axios";

const TestStory = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  let { FileInput, openFileDialog, uploadToS3, files } = useS3Upload();

  useEffect(() => {
    const log = localStorage.getItem("loggedIn");
    if (!log) return router.push("/login");
  }, []);

  //Tags
  const [tags, setTags] = useState([]);
  const [thumImage, setThumImage] = useState('/post-story-upload-thumbnail.svg');
  const filterTag = (removeIndex) => {
    const existingTags = tags.filter((_, index) => index !== removeIndex);
    setTags(existingTags);
  };
  const addTags = (e) => {
    if (tags.length + 1 <= 7) {
      if (e.keyCode == 32) {
        if (!/^\s*$/.test(e.target.value.trim())) {
          setTags([...tags, e.target.value.trim()]);
          e.target.value = "";
        }
      }
      if (e.keyCode == 13) {
        if (!/^\s*$/.test(e.target.value.trim())) {
          setTags([...tags, e.target.value.trim()]);
          e.target.value = "";
        }
      }
    } else {
      dispatch(notifyError("Can not add more than 7 tags."));
    }
  };

  //Enter post truned off
  const checkKeyDown = (e) => {
    if (e.keyCode === 13) e.preventDefault();
  };

  //Image posting
  const [image, setImage] = useState({
    viewImage: "",
  });
  const [imageLoad, setImageLoad] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isuploadedImage, setIsUploadedImage] = useState(false);
  const imageHandler = async (e) => {
    const newFile = e.target.files[0];

    const errorImage = await imageValid(newFile);
    if (errorImage) return dispatch(notifyError(errorImage));
    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.readyState === 2) {
        setIsUploadedImage(true);
        setThumImage('/uploading.gif')

        const image = await resizeFile(newFile);
        const file = await convertBase64ToFile(image);
        let { url, key } = await uploadToS3(file);
        console.log(url);
        setUploadedImage(url);
        setThumImage('/post-story-upload-thumbnail.svg')
        setImage({ viewImage: reader.result });
        setIsUploadedImage(false);
      }
    };
    if (newFile) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const [filesData, setFilesData] = useState([]);
  const [uploadedData, setUploadedData] = useState([]);

  const show = async (e) => {
    console.log('filesData',filesData);
    if (filesData.length > 3)
      return dispatch(notifyError("Can not upload more than 3 files."));
    const files = [...Array.from(e.target.files)];
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      const element = files[i];
      formData.append(`file[${i}]`, element);
    }

    for (var value of formData.values()) {
      console.log(value);
    }
    dispatch(notifyLoading(true));
    const filesUpload = await formDataPost(
      `image/upload`,
      formData,
      auth.token
    );
    console.log(filesUpload);
    setUploadedData([...uploadedData, filesUpload?.fileLinks]);
    setFilesData([e.target.files[0], ...filesData]);
    dispatch(notifyLoading(false));
  };

  console.log(filesData);

  const removeImage = async (img) => {
    setImage({ viewImage: "" });
  };

  const initialState = { title: "", communityId: "", summary: "", body: "" };
  const [post, setPost] = useState(initialState);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log('handleSubmit',e,post)
    e.preventDefault();
    const errorData = storyValid(post.title, post.communityId);
    if (errorData) return dispatch(notifyError(errorData));
    const user_id = auth.user.user_id;
    const email = auth.user.email;
    const name = auth.user.username;
    const image = uploadedImage
      ? uploadedImage
      : `https://fnm-uploads.s3.amazonaws.com/next-s3-uploads/${post.communityId}.png`;
    const data = { ...post, tags, user_id, image, email, name, file: uploadedData };
    console.log(uploadedData);
    // const formData = new FormData();
    // formData.append("title", post?.title);
    // formData.append("communityId", post?.communityId);
    // formData.append("summary", post?.summary);
    // formData.append("body", post?.body);
    // formData.append("tags", tags);
    // formData.append("image", image);
    // formData.append("user_id", user_id);
    // for (let i = 0; i < uploadedData.length; i++) {
    //   const element = uploadedData[i];
    //   formData.append(`file[${i}]`, element.Location);
    //   formData.append(`type[${i}]`, element.type);
    // }
    // formData.append("email", email);
    // formData.append("name", name);
    // for (var value of formData.values()) {
    //   console.log(value);
    // }
    // dispatch(notifyLoading(true));
    const storyData = await postData(`storyApi/post`, data, auth.token);

    dispatch(notifyLoading(false));
    console.log(storyData.data.redirect);
    if (storyData.success === true) return postSuccess(storyData.data.redirect);
    if (storyData.err) return dispatch(notifyError(storyData.err));
  };
  console.log(uploadedData);
  const postSuccess = (url) => {
    router.push(url);
  };

  if (auth.loading) return <PreloaderLg />;
  return auth.user.user_id ? (
    <div>
      <HeadData />
      <section className="post-story-sec dsgf">
        {imageLoad && (
          <div
            className="text-center fw-bold d-flex justify-content-center position-fixed py-1 px-5 rounded"
            style={{
              zIndex: 10,
              left: "40%",
              right: 0,
              width: "200px",
              backgroundColor: "rgba(255, 217, 0, 0.767)",
            }}
          >
            ...Uploading...
          </div>
        )}
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="post-story-inner">
                <h3>Posts your story here</h3>
                <div className="post-story__content">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt non ullamcorper fusce purus integer. At semper ac eget lacus dolor risus sed ac. Duis at arcu a bibendum nullam praesent fermentum id at. Gravida vulputate ut urna ac a quisque tincidunt</p>
                </div>
                <form
                  onSubmit={handleSubmit}
                // onKeyDown={(e) => checkKeyDown(e)}
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="post-story-upload-thumbnail">
                        <div className="post-story-upload-thumbnail__box">

                          <div className="drop-zone"><span className="drop-zone__prompt">
                            <label className="upload-file">
                              {image.viewImage && (
                                <img
                                  src={image.viewImage}
                                  alt="imageUplaod"
                                  className="w-25 mt-2"
                                />
                              )}
                              {!image.viewImage && (
                                <img
                                  src={thumImage}
                                  alt="imageUplaod"
                                  className="w-75 mt-2"
                                />
                              )}

                              <input
                                type="file"
                                accept="image/png , image/gif, image/jpeg, image/jpg"
                                name="file"
                                onChange={imageHandler}
                              />
                            </label>
                            {/*<div className="mt-0">
                                {filesData.map((i, idx) => (
                                  <div className="d-flex" key={idx}>
                                    {i.name}{" "}
                                    <p
                                      className="ml-3 cursor fw-bold"
                                      onClick={() =>
                                        setFilesData(
                                          filesData.filter((i, id) => id !== idx)
                                        )
                                      }
                                    >
                                      X
                                    </p>
                                  </div>
                                ))}
                                    </div>*/}

                            <h3 className="post-story-upload-thumbnail__titel">Drag or click to upload thumbnail Image</h3>
                          </span>
                            <div className="drop-zone__thumb" data-label="myfile.txt">
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="post-story-upload-thumbnail-form">

                        <div className="contact-us-col">
                          <div className="form-control__box">
                            <label>Post Title</label>
                            <input className="form-control" name="title" type="text" placeholder="Post Title Here.." onChange={handleChangeInput} />
                          </div>
                        </div>
                        <div className="contact-us-col">
                          <div className="form-control__box">
                            <label>Community Categories</label>
                            <div className="select-box"><select className="dropdown" name="communityId"
                              onChange={handleChangeInput}>
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
                            </select></div>
                          </div>
                        </div>
                        <div className="contact-us-col">
                          <div className="form-control__box">
                            <label>Short Summary of Story</label>
                            <input type="text"  name="summary" placeholder="Sort summery will be here.." onChange={handleChangeInput} />
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-control__box2">
                        <label>Message Body</label>
                        <textarea
                          rows="10"
                          name="body"
                          className="form-control"
                          placeholder="write your message......."
                          onChange={handleChangeInput}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="upload-attachments">
                    <div className="row">
                      <div className="col-md-12">
                        <h3 className="upload-attachments__titel">Upload Attachments</h3>
                        <ul className="upload-attachments__item">
                          <li>
                            <a href="#" data-toggle="modal" data-target="#test-modal"></a>
                            <label className="upload-file">
                              {" "}
                              <img src="/upload-icon.svg" alt="" />
                              <input
                                type="file"
                                accept="image/png , image/gif, image/jpeg, image/jpg"
                                name="file"
                                onChange={(e) => show(e)}
                              />
                            </label>
                          </li>
                       
                          {filesData.map((i, idx) => (
                            <li key={idx}>
                              <span 
                                className="remove__ve"
                                onClick={() =>
                                  setFilesData(
                                    filesData.filter((i, id) => id !== idx)
                                  )
                                }
                                ></span>
                              {i.name}{" "}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="">
             

                    <div className="p-2 mt-4">
                    
                      <div className="contact-us-col">
                        <div className="form-control__box">
                          <label>Add a Youtube Video Link</label>
                          <input
                            type="text"
                            name="videoLink"
                            className="form-control"
                            placeholder=""
                            onChange={(e) =>
                              setUploadedData([
                                ...uploadedData,
                                { Location: e.target.value, type: 2 },
                              ])
                            }
                          />
                        </div>
                      </div>
                     
                    </div>

                  
                  </div>
                  <div className=" form-group contact-us-col ne-editor mt-4">
                    <div className="form-control__box">
                      <label className="upload-attachments__titel">Tags</label>
                      <div className="bs-example">
                        <div className="bootstrap-tagsinput">
                          {tags.map((tags, index) => (
                            <span key={index} className="tag label label-info">
                              {tags}
                              <span
                                style={{ cursor: "pointer" }}
                                data-role="remove"
                              >
                                <b onClick={() => filterTag(index)}>X</b>
                              </span>
                            </span>
                          ))}
                        </div>
                        <input
                          type="text"
                          placeholder="Enter tag"
                          name="tags"
                          className="form-control"
                          onKeyDown={addTags}
                          data-role="tagsinput"
                        />
                      </div>
                      <small>
                        Tags will help find your story. Please use valid tags.
                      </small>
                    </div>
                  </div>

                
                  <div className="form-group">
                    <button className="post-btn" type="submit">
                      Post Story
                    </button>
                  </div>
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

export default TestStory;
