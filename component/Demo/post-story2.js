/* eslint-disable @next/next/no-img-element */
import HeadData from "../HeadData";
import { useEffect, useRef, useState } from "react";
import PreloaderLg from "../Preloader/PreloaderLg";
import { deleteData, postData, uploadFile } from "../../utils/api-client";
import { useDispatch, useSelector } from "react-redux";
import storyValid from "../../utils/story/storyValid";
import {
  notifyError,
  notifyLoading,
  notifySuccess,
} from "../../store/notify/action";
import { useRouter } from "next/dist/client/router";
import { imageValid } from "../../utils/validCheck";
import { useS3Upload } from "next-s3-upload";
import { resizeFile, convertBase64ToFile } from "../../utils/imageShrink";

const PostStory = () => {
	
	console.log('page: ','component/Demo')

  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  let { FileInput, openFileDialog, uploadToS3, files } = useS3Upload();
  useEffect(() => {
    const log = localStorage.getItem("loggedIn");
    if (!log) return router.push("/login");
  }, []);

  useEffect(() => {
    editorRef.current = {
      // CKEditor: require('@ckeditor/ckeditor5-react'), // depricated in v3
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);

  //Tags
  const [tags, setTags] = useState([]);
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
        console.log('file',file);
        let { url, key } = await uploadToS3(file);
        setUploadedImage(url);
        setImage({ viewImage: reader.result });
        setIsUploadedImage(false);
      }
    };
    if (newFile) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const removeImage = async (img) => {
    // const data = await deleteData(`image/delete?img=${img}`, auth.token);

    // if (data.success)
    //   return dispatch(notifySuccess("Image deleted Successfully"));
    // if (data.err) return dispatch(notifyError(data.err));
    setImage({ viewImage: "" });
  };

  const [body, setBody] = useState([]);
  const handleBody = (event, editor) => {
    const data = editor.getData();
    setBody(data);
  };

  const initialState = { title: "", communityId: "", summary: "" };
  const [post, setPost] = useState(initialState);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorData = storyValid(post.title, post.communityId, body);
    if (errorData) return dispatch(notifyError(errorData));
    const user_id = auth.user.user_id;
    const email = auth.user.email;
    const name = auth.user.username;
    const image = uploadedImage
      ? uploadedImage
      : `https://fnm-uploads.s3.amazonaws.com/next-s3-uploads/${post.communityId}.png`;
    const data = { ...post, body, tags, user_id, image, email, name };
    dispatch(notifyLoading(true));
    const storyData = await postData(`storyApi/post`, data, auth.token);
    dispatch(notifyLoading(false));
    if (storyData.msg) return postSuccess(storyData.redirect);
    if (storyData.err) return dispatch(notifyError(storyData.err));
  };

  const postSuccess = (url) => {
    router.push(url);
  };

  if (auth.loading) return <PreloaderLg />;
  return editorLoaded && auth.user.user_id ? (
    <div>
      <HeadData />
      <section className="post-story-sec">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="post-story-inner">
                <h3>Post your story here</h3>
               

                <form
                  onSubmit={handleSubmit}
                  onKeyDown={(e) => checkKeyDown(e)}
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          name="title"
                          className="form-control"
                          placeholder=""
                          onChange={handleChangeInput}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Community Categories</label>
                        <select
                          className="form-control"
                          name="communityId"
                          onChange={handleChangeInput}
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
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Short Summary of Story</label>
                        <input
                          type="text"
                          name="summary"
                          className="form-control"
                          placeholder=""
                          onChange={handleChangeInput}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Thumbnail for Story</label>
                    <label className="upload-file">
                      {" "}
                      Upload
                      <input type="file" name="file" onChange={imageHandler} />
                    </label>
                    {!image.viewImage && !isuploadedImage && (
                      <span>No file selected</span>
                    )}
                    {isuploadedImage && (
                      <span>
                        <img src="/uploading.gif" alt="uploading" />
                      </span>
                    )}
                    {image.viewImage && (
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
                    )}
                  </div>
                  <div className="form-group">
                    <label>Body</label>
                    <CKEditor
                      editor={ClassicEditor}
                      config={{
                        ckfinder: {
                          uploadUrl: "/api/image/upload",
                        },
                      }}
                      onChange={handleBody}
                    />
                  </div>
                  <div className="form-group tag">
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
                      <input
                        type="text"
                        placeholder="Enter Tag"
                        name="tags"
                        className="form-control"
                        onKeyDown={addTags}
                        data-role="tagsinput"
                      />
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

export default PostStory;
