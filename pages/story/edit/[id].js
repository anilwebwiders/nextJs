/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import PreloaderLg from "../../../component/Preloader/PreloaderLg";
import HeadData from "../../../component/HeadData";
import NotFound from "../../404";
import { getAll, patchData } from "../../../utils/api-client";
import { notifyError, notifyLoading } from "../../../store/notify/action";
import { imageValid } from "../../../utils/validCheck";
import { useS3Upload } from "next-s3-upload";
import { convertBase64ToFile, resizeFile } from "../../../utils/imageShrink";

import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});
const buttonList = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const EditStory = (props) => {
  const [defaultStory, setDefaultStory] = useState(props.story.data);
  // console.log('storydata',defaultStory);
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const log = localStorage.getItem("loggedIn");
    if (!log) return router.push("/login");
  }, []);

  //Tags
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const finalTags = defaultStory.tags.split(",");
    setTags(finalTags);
  }, [defaultStory]);
  const filterTag = (removeIndex) => {
    const existingTags = tags.filter((_, index) => index !== removeIndex);
    setTags(existingTags);
  };
  const addTags = (e) => {
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
  };

  //Enter post truned off
  const checkKeyDown = (e) => {
    if (e.keyCode === 13) e.preventDefault();
  };

  //Image posting
  let { FileInput, openFileDialog, uploadToS3, files } = useS3Upload();
  const [image, setImage] = useState({
    viewImage: defaultStory.post_thumbnail,
  });
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
        const image = await resizeFile(newFile);
        const file = await convertBase64ToFile(image);
        let { url } = await uploadToS3(file);
        setUploadedImage(url);
        setImage({ viewImage: reader.result });
        setIsUploadedImage(false);
      }
    };
    if (newFile) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const [imageLoad, setImageLoad] = useState(false);
  const handleImageUpload = (files, info, uploadHandler) => {
    (async () => {
      setImageLoad(true);
      const image = await resizeFile(files[0]);
      const file = await convertBase64ToFile(image);
      let { url } = await uploadToS3(file);
      let res = {
        result: [{ url: url, name: files[0].name, size: files[0].size }],
      };
      uploadHandler(res);
      setImageLoad(false);
    })();
    uploadHandler();
  };

  const removeImage = async (img) => {
    // const data = await deleteData(`image/delete?img=${img}`, auth.token);

    // if (data.success)
    //   return dispatch(notifySuccess("Image deleted Successfully"));
    // if (data.err) return dispatch(notifyError(data.err));
    setImage({ viewImage: "" });
  };

  const [body, setBody] = useState([]);
  const handleBody = (event) => {
    // const data = editor.getData();
    // setBody(data);
    console.log(event);
    setBody(event);
  };

  const initialState = { title: "", communityId: "", summary: "" };
  const [post, setPost] = useState(initialState);
  const { title, communityId, summary } = post;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const [postSuccess, setPostSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postInfo = {
      title: title ? title : defaultStory.title,
      summary: summary ? summary : defaultStory.short_story,
      body: body.length > 0 ? body : defaultStory.body,
      tags,
      communityId: defaultStory.community_id,
      image: uploadedImage ? uploadedImage : defaultStory.post_thumbnail,
      story_id: defaultStory.story_id,
    };
    dispatch(notifyLoading(true));
    const data = await patchData("storyApi/edit", postInfo, auth.token);
    dispatch(notifyLoading(false));
    if (data.success) return setPostSuccess(true);
    if (data.err) return dispatch(notifyError(data.err));
  };

  useEffect(() => {
    if (postSuccess)
      router.push(
        `/story/${defaultStory.story_id}/${defaultStory.title
          .replace(/\s/g, "-")
          .substring(0, 60)}`
      );
  }, [postSuccess]);

  if (auth.loading) return <PreloaderLg />;
  return auth.user.user_id ? (
    <div>
      <HeadData />
      <section className="post-story-sec">
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
                <h3>Update your story here</h3>

                <form
                  onSubmit={handleSubmit}
                  // onKeyDown={(e) => checkKeyDown(e)}
                >
                  <div className="row">
                    <div className="col-md-6">
                          <div className="post-story-upload-thumbnail">
                            <div className="post-story-upload-thumbnail__box">
                               <div className="drop-zone">
                                <label className="upload-file">
                                  {" "}
                                  <img src="/post-story-upload-thumbnail.svg" alt="imageUplaod" className="w-75 mt-2"/>
                                  <input type="file"  accept="image/png , image/gif, image/jpeg, image/jpg" name="file" onChange={imageHandler} />
                                </label>
                                {isuploadedImage && (
                                  <span>
                                    <img src="/uploading.gif" alt="uploading" />
                                  </span>
                                )}
                                {/* {image.viewImage && (
                                  <span
                                    style={{ cursor: "pointer" }}
                                    onClick={() => removeImage(uploadedImage)}
                                  >
                                    <b>X</b> Remove Image
                                  </span>
                                )}
                                {image.viewImage && (
                                  <img
                                    src={image.viewImage}
                                    alt="imageUplaod"
                                    className="w-25 mt-2"
                                  />
                                )} */}
                                <label className="post-story-upload-thumbnail__titel">Click to upload thumbnail Image for Story</label>
                               </div>
                            </div>
                        </div>
                     </div>
                    <div className="col-md-6">
                        <div className="post-story-upload-thumbnail-form">
                          <div className="contact-us-col">
                            <div className="form-control__box">
                              <label>Title</label>
                              <input
                                type="text"
                                name="title"
                                className="form-control"
                                defaultValue={defaultStory?.title?.replace(
                                  /%comma%/g,
                                  "'"
                                )}
                                onChange={handleChangeInput}
                              />
                            </div>
                          </div>
                          <div className="contact-us-col">
                            <div className="form-control__box">
                                <label>Community Categories</label>
                                <div className="select-box">
                                  <select className="dropdown" name="communityId" value={defaultStory.community_title}
                                  defaultValue={defaultStory.community_id} onChange={handleChangeInput}>
                                    <option  value="1">Eating Disorder</option>
                                    <option value="2">Weight Issues</option>
                                    <option value="3">Heart Diseases</option>
                                    <option value="4">Anxiety</option>
                                    <option value="5">Depression</option>
                                    <option value="6">Drug Addiction</option>
                                    <option value="7">Insecurity</option>
                                    <option value="8">Mental Health</option>
                                    <option value="9">Stress</option>
                                    <option value="10">Alchohol Addiction</option>
                                    <option value="11">Smoking</option>
                                  </select></div>
                                {/* <input
                                  className="form-control"
                                  name="communityId"
                                  value={defaultStory.community_title}
                                  defaultValue={defaultStory.community_id}
                                  onChange={handleChangeInput}
                                /> */}
                              </div>
                          </div>
                          <div className="contact-us-col">
                            <div className="form-control__box">
                              <label>Shorts Summary of Story</label>
                              <input
                                type="text"
                                name="summary"
                                className="form-control"
                                placeholder=""
                                defaultValue={defaultStory.short_story}
                                onChange={handleChangeInput}
                              />
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-control__box2">
                        <label>Message Body</label>
                              <SunEditor
                            defaultValue={defaultStory.body.replace(/%comma%/g, "'")}
                            onChange={handleBody}
                            onImageUploadBefore={handleImageUpload}
                            setOptions={{
                              height: 200,
                              buttonList: [
                                ["fontSize"],
                                ["align", "bold", "italic"],
                                ["link"],
                                ["image"],
                                ["video"],
                              ], // Or Array of button list, eg. [['font', 'align'], ['image']]
                              // plugins: [font] set plugins, all plugins are set by default
                              // Other option
                            }}
                            //   setAllPlugins={true}
                          />
                      </div>
                    </div>
                  </div>
                  {/* <div className="form-group">
                    <label>Body</label>

                    <SunEditor
                      defaultValue={defaultStory.body.replace(/%comma%/g, "'")}
                      onChange={handleBody}
                      onImageUploadBefore={handleImageUpload}
                      setOptions={{
                        height: 200,
                        buttonList: [
                          ["fontSize"],
                          ["align", "bold", "italic"],
                          ["link"],
                          ["image"],
                          ["video"],
                        ], // Or Array of button list, eg. [['font', 'align'], ['image']]
                        // plugins: [font] set plugins, all plugins are set by default
                        // Other option
                      }}
                      //   setAllPlugins={true}
                    />
                  </div> */}
                  <div className=" form-group contact-us-col ne-editor mt-4">
                  <div className="form-control__box">
                    <label>Tags</label>
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
                      <small></small>
                      <input
                        type="text"
                        placeholder="Enter Tag"
                        name="tags"
                        className="form-control"
                        onKeyUp={addTags}
                        data-role="tagsinput"
                      />
                    </div>
                   <small> Tags will help find your story. Please use valid tags.</small>
                  </div>
                  </div>
                  <div className="form-group">
                    <button className="post-btn" type="submit">
                      Update Story
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

export async function getServerSideProps(query) {
  const res = await getAll(`storyApi/getStoryDetails?story_id=${query.params.id}&user_id="undefined"`);
  return {
    props: {
      story: res,
    }, // will be passed to the page component as props
  };
}

export default EditStory;
