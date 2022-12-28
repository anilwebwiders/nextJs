// /* eslint-disable @next/next/no-img-element */
// import HeadData from "../component/HeadData";
// import { useEffect, useRef, useState } from "react";
// import PreloaderLg from "../component/Preloader/PreloaderLg";
// import { deleteData, postData, uploadFile } from "../utils/api-client";
// import { useDispatch, useSelector } from "react-redux";
// import storyValid from "../utils/story/storyValid";
// import {
//   notifyError,
//   notifyLoading,
//   notifySuccess,
// } from "../store/notify/action";
// import { useRouter } from "next/dist/client/router";
// import { imageValid } from "../utils/validCheck";
// import { useS3Upload } from "next-s3-upload";
// import { resizeFile, convertBase64ToFile } from "../utils/imageShrink";
// import dynamic from "next/dynamic";
// import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

// const SunEditor = dynamic(() => import("suneditor-react"), {
//   ssr: false,
// });

// const TestStory = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const auth = useSelector((state) => state.auth);

//   let { FileInput, openFileDialog, uploadToS3, files } = useS3Upload();
//   useEffect(() => {
//     const log = localStorage.getItem("loggedIn");
//     if (!log) return router.push("/login");
//   }, []);

//   //Tags
//   const [tags, setTags] = useState([]);
//   const filterTag = (removeIndex) => {
//     const existingTags = tags.filter((_, index) => index !== removeIndex);
//     setTags(existingTags);
//   };
//   const addTags = (e) => {
//     if (tags.length + 1 <= 7) {
//       if (e.keyCode == 32) {
//         if (!/^\s*$/.test(e.target.value.trim())) {
//           setTags([...tags, e.target.value.trim()]);
//           e.target.value = "";
//         }
//       }
//       if (e.keyCode == 13) {
//         if (!/^\s*$/.test(e.target.value.trim())) {
//           setTags([...tags, e.target.value.trim()]);
//           e.target.value = "";
//         }
//       }
//     } else {
//       dispatch(notifyError("Can not add more than 7 tags."));
//     }
//   };

//   //Enter post truned off
//   const checkKeyDown = (e) => {
//     if (e.keyCode === 13) e.preventDefault();
//   };

//   //Image posting
//   const [image, setImage] = useState({
//     viewImage: "",
//   });
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [isuploadedImage, setIsUploadedImage] = useState(false);
//   const imageHandler = async (e) => {
//     const newFile = e.target.files[0];
//     const errorImage = await imageValid(newFile);
//     if (errorImage) return dispatch(notifyError(errorImage));
//     const reader = new FileReader();
//     reader.onload = async () => {
//       if (reader.readyState === 2) {
//         setIsUploadedImage(true);
//         const image = await resizeFile(newFile);
//         const file = await convertBase64ToFile(image);
//         let { url, key } = await uploadToS3(file);
//         setUploadedImage(url);
//         setImage({ viewImage: reader.result });
//         setIsUploadedImage(false);
//       }
//     };
//     if (newFile) {
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   const [imageLoad, setImageLoad] = useState(false);
//   const handleImageUpload = (files, info, uploadHandler) => {
//     setImageLoad(true);
//     (async () => {
//       const image = await resizeFile(files[0]);
//       const file = await convertBase64ToFile(image);
//       let { url } = await uploadToS3(file);
//       let res = {
//         result: [{ url: url, name: files[0].name, size: files[0].size }],
//       };
//       uploadHandler(res);
//       setImageLoad(false);
//     })();
//     uploadHandler();
//   };

//   console.log(imageLoad);

//   const apiToHostImage = async (fileData) => {
//     const image = await resizeFile(fileData);
//     const file = await convertBase64ToFile(image);
//     let { url, key } = await uploadToS3(file);
//     console.log(url);
//     return url;
//   };

//   const removeImage = async (img) => {
//     // const data = await deleteData(`image/delete?img=${img}`, auth.token);

//     // if (data.success)
//     //   return dispatch(notifySuccess("Image deleted Successfully"));
//     // if (data.err) return dispatch(notifyError(data.err));
//     setImage({ viewImage: "" });
//   };

//   const [body, setBody] = useState([]);
//   const handleBody = (event) => {
//     // const data = editor.getData();
//     // setBody(data);
//     console.log(event);
//     setBody(event);
//   };

//   const initialState = { title: "", communityId: "", summary: "" };
//   const [post, setPost] = useState(initialState);

//   const handleChangeInput = (e) => {
//     const { name, value } = e.target;
//     setPost({ ...post, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errorData = storyValid(post.title, post.communityId, body);
//     if (errorData) return dispatch(notifyError(errorData));
//     const user_id = auth.user.user_id;
//     const email = auth.user.email;
//     const name = auth.user.username;
//     const image = uploadedImage
//       ? uploadedImage
//       : `https://fnm-uploads.s3.amazonaws.com/next-s3-uploads/${post.communityId}.png`;
//     const data = { ...post, body, tags, user_id, image, email, name };
//     dispatch(notifyLoading(true));
//     const storyData = await postData(`storyApi/post`, data, auth.token);
//     dispatch(notifyLoading(false));
//     console.log(storyData.data.redirect)
//     if (storyData.success === true) return postSuccess(storyData.data.redirect);
//     if (storyData.err) return dispatch(notifyError(storyData.err));
//   };

//   const postSuccess = (url) => {
//     router.push(url);
//   };

//   if (auth.loading) return <PreloaderLg />;
//   return auth.user.user_id ? (
//     <div>
//       <HeadData />
//       <section className="post-story-sec">
//         {imageLoad && (
//           <div
//             className="text-center fw-bold d-flex justify-content-center position-fixed py-1 px-5 rounded"
//             style={{
//               zIndex: 10,
//               left: "40%",
//               right: 0,
//               width: "200px",
//               backgroundColor: "rgba(255, 217, 0, 0.767)",
//             }}
//           >
//             ...Uploading...
//           </div>
//         )}
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-12">
//               <div className="post-story-inner">
//                 <h3>Post your story here</h3>

//                 <form
//                   onSubmit={handleSubmit}
//                   // onKeyDown={(e) => checkKeyDown(e)}
//                 >
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="form-group">
//                         <label>Title</label>
//                         <input
//                           type="text"
//                           name="title"
//                           className="form-control"
//                           placeholder=""
//                           onChange={handleChangeInput}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="form-group">
//                         <label>Community Categories</label>
//                         <select
//                           className="form-control"
//                           name="communityId"
//                           onChange={handleChangeInput}
//                         >
//                           <option>Select Community</option>
//                           <option value="3">Eating Disorder</option>
//                           <option value="4">Weight Issues</option>
//                           <option value="5">Heart Diseases</option>
//                           <option value="6">Anxiety</option>
//                           <option value="7">Depression</option>
//                           <option value="1">Drug Addiction</option>
//                           <option value="8">Insecurity</option>
//                           <option value="9">Mental Health</option>
//                           <option value="10">Stress</option>
//                           <option value="2">Alchohol Addiction</option>
//                           <option value="11">Smoking</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="form-group">
//                         <label>Short Summary of Story</label>
//                         <input
//                           type="text"
//                           name="summary"
//                           className="form-control"
//                           placeholder=""
//                           onChange={handleChangeInput}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="form-group">
//                     <label>Thumbnail for Story</label>
//                     <label className="upload-file">
//                       {" "}
//                       Upload
//                       <input type="file" name="file" onChange={imageHandler} />
//                     </label>
//                     {!image.viewImage && !isuploadedImage && (
//                       <span>No file selected</span>
//                     )}
//                     {isuploadedImage && (
//                       <span>
//                         <img src="/uploading.gif" alt="uploading" />
//                       </span>
//                     )}
//                     {image.viewImage && (
//                       <span
//                         style={{ cursor: "pointer" }}
//                         onClick={() => removeImage(uploadedImage)}
//                       >
//                         <b>X</b> Remove Image
//                       </span>
//                     )}
//                     {image.viewImage && (
//                       <img
//                         src={image.viewImage}
//                         alt="imageUplaod"
//                         className="w-25 mt-2"
//                       />
//                     )}
//                   </div>
//                   <div className="form-group">
//                     <label>Body</label>

//                     <SunEditor
//                       onChange={handleBody}
//                       onImageUploadBefore={handleImageUpload}
//                       height="450px"
//                       setOptions={{
//                         height: 200,
//                         buttonList: [
//                           ["fontSize"],
//                           ["align", "bold", "italic"],
//                           ["link"],
//                           ["image"],
//                           ["video"],
//                         ], // Or Array of button list, eg. [['font', 'align'], ['image']]
//                         // plugins: [font] set plugins, all plugins are set by default
//                         // Other option
//                       }}
//                       //   setAllPlugins={true}
//                     />
//                   </div>
//                   <div className="form-group tag">
//                     <label>Tags</label>
//                     <div className="bs-example">
//                       <div className="bootstrap-tagsinput">
//                         {tags.map((tags, index) => (
//                           <span key={index} className="tag label label-info">
//                             {tags}
//                             <span
//                               style={{ cursor: "pointer" }}
//                               data-role="remove"
//                             >
//                               <b onClick={() => filterTag(index)}>X</b>
//                             </span>
//                           </span>
//                         ))}
//                       </div>
//                       <input
//                         type="text"
//                         placeholder="Enter Tag"
//                         name="tags"
//                         className="form-control"
//                         onKeyDown={addTags}
//                         data-role="tagsinput"
//                       />
//                       <small>
//                         Tags will help find your story. Please use valid tags.
//                       </small>
//                     </div>
//                   </div>
//                   <div className="form-group">
//                     <button className="post-btn" type="submit">
//                       Post Story
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   ) : (
//     <PreloaderLg />
//   );
// };

// export default TestStory;


// // /* eslint-disable @next/next/no-img-element */
// // import HeadData from "../component/HeadData";
// // import { useEffect, useRef, useState } from "react";
// // import PreloaderLg from "../component/Preloader/PreloaderLg";
// // import { formDataPost } from "../utils/api-client";
// // import { useDispatch, useSelector } from "react-redux";
// // import storyValid from "../utils/story/storyValid";
// // import {
// //   notifyError,
// //   notifyLoading,
// //   notifySuccess,
// // } from "../store/notify/action";
// // import { useRouter } from "next/dist/client/router";
// // import { imageValid } from "../utils/validCheck";
// // import { useS3Upload } from "next-s3-upload";
// // import { resizeFile, convertBase64ToFile } from "../utils/imageShrink";
// // import axios from "axios";

// // const TestStory = () => {
// //   const router = useRouter();
// //   const dispatch = useDispatch();
// //   const auth = useSelector((state) => state.auth);

// //   let { FileInput, openFileDialog, uploadToS3, files } = useS3Upload();

// //   useEffect(() => {
// //     const log = localStorage.getItem("loggedIn");
// //     if (!log) return router.push("/login");
// //   }, []);

// //   //Tags
// //   const [tags, setTags] = useState([]);
// //   const filterTag = (removeIndex) => {
// //     const existingTags = tags.filter((_, index) => index !== removeIndex);
// //     setTags(existingTags);
// //   };
// //   const addTags = (e) => {
// //     if (tags.length + 1 <= 7) {
// //       if (e.keyCode == 32) {
// //         if (!/^\s*$/.test(e.target.value.trim())) {
// //           setTags([...tags, e.target.value.trim()]);
// //           e.target.value = "";
// //         }
// //       }
// //       if (e.keyCode == 13) {
// //         if (!/^\s*$/.test(e.target.value.trim())) {
// //           setTags([...tags, e.target.value.trim()]);
// //           e.target.value = "";
// //         }
// //       }
// //     } else {
// //       dispatch(notifyError("Can not add more than 7 tags."));
// //     }
// //   };

// //   //Enter post truned off
// //   const checkKeyDown = (e) => {
// //     if (e.keyCode === 13) e.preventDefault();
// //   };

// //   //Image posting
// //   const [image, setImage] = useState({
// //     viewImage: "",
// //   });
// //   const [imageLoad, setImageLoad] = useState(false);
// //   const [uploadedImage, setUploadedImage] = useState(null);
// //   const [isuploadedImage, setIsUploadedImage] = useState(false);
// //   const imageHandler = async (e) => {
// //     const newFile = e.target.files[0];
// //     const errorImage = await imageValid(newFile);
// //     if (errorImage) return dispatch(notifyError(errorImage));
// //     const reader = new FileReader();
// //     reader.onload = async () => {
// //       if (reader.readyState === 2) {
// //         setIsUploadedImage(true);
// //         const image = await resizeFile(newFile);
// //         const file = await convertBase64ToFile(image);
// //         let { url, key } = await uploadToS3(file);
// //         setUploadedImage(url);
// //         setImage({ viewImage: reader.result });
// //         setIsUploadedImage(false);
// //       }
// //     };
// //     if (newFile) {
// //       reader.readAsDataURL(e.target.files[0]);
// //     }
// //   };

// //   const [filesData, setFilesData] = useState([]);
// //   console.log(filesData);
// //   const show = async (e) => {
// //     setFilesData([...Array.from(e.target.files), ...filesData]);
// //   };

// //   const removeImage = async (img) => {
// //     setImage({ viewImage: "" });
// //   };

// //   const initialState = { title: "", communityId: "", summary: "", body: "" };
// //   const [post, setPost] = useState(initialState);

// //   const handleChangeInput = (e) => {
// //     const { name, value } = e.target;
// //     setPost({ ...post, [name]: value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const errorData = storyValid(post.title, post.communityId);
// //     if (errorData) return dispatch(notifyError(errorData));
// //     const user_id = auth.user.user_id;
// //     const email = auth.user.email;
// //     const name = auth.user.username;
// //     const image = uploadedImage
// //       ? uploadedImage
// //       : `https://fnm-uploads.s3.amazonaws.com/next-s3-uploads/${post.communityId}.png`;
// //     // const data = { ...post, body, tags, user_id, image, email, name };
// //     const formData = new FormData();
// //     formData.append("title", post?.title);
// //     formData.append("communityId", post?.communityId);
// //     formData.append("summary", post?.summary);
// //     formData.append("body", post?.body);
// //     formData.append("tags", tags);
// //     formData.append("image", image);
// //     formData.append("user_id", user_id);
// //     for (let i = 0; i < filesData.length; i++) {
// //       const element = filesData[i];
// //       formData.append(`file[${i}]`, element);
// //     }
// //     formData.append("email", email);
// //     formData.append("name", name);
// //     for (var value of formData.values()) {
// //       console.log(value);
// //     }
// //     dispatch(notifyLoading(true));
// //     const storyData = await formDataPost(
// //       `storyApi/post`,
// //       formData,
// //       auth.token
// //     );
// //     // axios
// //     //   .post(`${process.env.BASE_URL}/api/storyApi/post/test`, formData, {
// //     //     headers: {
// //     //       Authorization: auth.token,
// //     //     },
// //     //   })
// //     //   .then((res) => {
// //     //     alert("File Upload success");
// //     //   })
// //     //   .catch((err) => alert("File Upload Error"));

// //     dispatch(notifyLoading(false));
// //     console.log(storyData.data.redirect);
// //     if (storyData.success === true) return postSuccess(storyData.data.redirect);
// //     if (storyData.err) return dispatch(notifyError(storyData.err));
// //   };

// //   const postSuccess = (url) => {
// //     router.push(url);
// //   };

// //   if (auth.loading) return <PreloaderLg />;
// //   return auth.user.user_id ? (
// //     <div>
// //       <HeadData />
// //       <section className="post-story-sec">
// //         {imageLoad && (
// //           <div
// //             className="text-center fw-bold d-flex justify-content-center position-fixed py-1 px-5 rounded"
// //             style={{
// //               zIndex: 10,
// //               left: "40%",
// //               right: 0,
// //               width: "200px",
// //               backgroundColor: "rgba(255, 217, 0, 0.767)",
// //             }}
// //           >
// //             ...Uploading...
// //           </div>
// //         )}
// //         <div className="container-fluid">
// //           <div className="row">
// //             <div className="col-12">
// //               <div className="post-story-inner">
// //                 <h3>Post your story here</h3>

// //                 <form
// //                   onSubmit={handleSubmit}
// //                   // onKeyDown={(e) => checkKeyDown(e)}
// //                 >
// //                   <div className="row">
// //                     <div className="col-md-6">
// //                       <div className="form-group">
// //                         <label>Title</label>
// //                         <input
// //                           type="text"
// //                           name="title"
// //                           className="form-control"
// //                           placeholder=""
// //                           onChange={handleChangeInput}
// //                         />
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <div className="row">
// //                     <div className="col-md-6">
// //                       <div className="form-group">
// //                         <label>Community Categories</label>
// //                         <select
// //                           className="form-control"
// //                           name="communityId"
// //                           onChange={handleChangeInput}
// //                         >
// //                           <option>Select Community</option>
// //                           <option value="3">Eating Disorder</option>
// //                           <option value="4">Weight Issues</option>
// //                           <option value="5">Heart Diseases</option>
// //                           <option value="6">Anxiety</option>
// //                           <option value="7">Depression</option>
// //                           <option value="1">Drug Addiction</option>
// //                           <option value="8">Insecurity</option>
// //                           <option value="9">Mental Health</option>
// //                           <option value="10">Stress</option>
// //                           <option value="2">Alchohol Addiction</option>
// //                           <option value="11">Smoking</option>
// //                         </select>
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <div className="row">
// //                     <div className="col-md-6">
// //                       <div className="form-group">
// //                         <label>Short Summary of Story</label>
// //                         <input
// //                           type="text"
// //                           name="summary"
// //                           className="form-control"
// //                           placeholder=""
// //                           onChange={handleChangeInput}
// //                         />
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <div className="form-group">
// //                     <label>Thumbnail for Story</label>
// //                     <label className="upload-file">
// //                       {" "}
// //                       Upload
// //                       <input type="file" name="file" onChange={imageHandler} />
// //                     </label>
// //                     {!image.viewImage && !isuploadedImage && (
// //                       <span>No file selected</span>
// //                     )}
// //                     {isuploadedImage && (
// //                       <span>
// //                         <img src="/uploading.gif" alt="uploading" />
// //                       </span>
// //                     )}
// //                     {image.viewImage && (
// //                       <span
// //                         style={{ cursor: "pointer" }}
// //                         onClick={() => removeImage(uploadedImage)}
// //                       >
// //                         <b>X</b> Remove Image
// //                       </span>
// //                     )}
// //                     {image.viewImage && (
// //                       <img
// //                         src={image.viewImage}
// //                         alt="imageUplaod"
// //                         className="w-25 mt-2"
// //                       />
// //                     )}
// //                   </div>
// //                   <div className="form-group">
// //                     <label>Body</label>
// //                     <div className="p-2 my-4">
// //                       <label className="upload-file">
// //                         {" "}
// //                         Add Images/videos
// //                         <input
// //                           type="file"
// //                           accept="image/png , image/gif, image/jpeg, image/jpg, video/mp4,video/x-m4v,video/*"
// //                           name="file"
// //                           multiple
// //                           onChange={(e) => show(e)}
// //                         />
// //                       </label>
// //                       <div className="mt-4">
// //                         {filesData.map((i, idx) => (
// //                            <div className="d-flex" key={idx}>
// //                             {i.name}{" "}
// //                             <p
// //                               className="ml-3 cursor fw-bold"
// //                               onClick={() =>
// //                                 setFilesData(
// //                                   filesData.filter((i, id) => id !== idx)
// //                                 )
// //                               }
// //                             >
// //                               X
// //                             </p>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     </div>

// //                     <textarea
// //                       rows="10"
// //                       name="body"
// //                       className="form-control"
// //                       placeholder=""
// //                       onChange={handleChangeInput}
// //                     />
// //                   </div>
// //                   <div className="form-group tag">
// //                     <label>Tags</label>
// //                     <div className="bs-example">
// //                       <div className="bootstrap-tagsinput">
// //                         {tags.map((tags, index) => (
// //                           <span key={index} className="tag label label-info">
// //                             {tags}
// //                             <span
// //                               style={{ cursor: "pointer" }}
// //                               data-role="remove"
// //                             >
// //                               <b onClick={() => filterTag(index)}>X</b>
// //                             </span>
// //                           </span>
// //                         ))}
// //                       </div>
// //                       <input
// //                         type="text"
// //                         placeholder="Enter Tag"
// //                         name="tags"
// //                         className="form-control"
// //                         onKeyDown={addTags}
// //                         data-role="tagsinput"
// //                       />
// //                       <small>
// //                         Tags will help find your story. Please use valid tags.
// //                       </small>
// //                     </div>
// //                   </div>
// //                   <div className="form-group">
// //                     <button className="post-btn" type="submit">
// //                       Post Story
// //                     </button>
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   ) : (
// //     <PreloaderLg />
// //   );
// // };

// // export default TestStory;


// /* eslint-disable @next/next/no-img-element */
// import HeadData from "../component/HeadData";
// import { useEffect, useRef, useState } from "react";
// import PreloaderLg from "../component/Preloader/PreloaderLg";
// import { formDataPost } from "../utils/api-client";
// import { useDispatch, useSelector } from "react-redux";
// import storyValid from "../utils/story/storyValid";
// import {
//   notifyError,
//   notifyLoading,
//   notifySuccess,
// } from "../store/notify/action";
// import { useRouter } from "next/dist/client/router";
// import { imageValid } from "../utils/validCheck";
// import { useS3Upload } from "next-s3-upload";
// import { resizeFile, convertBase64ToFile } from "../utils/imageShrink";
// import axios from "axios";

// const TestStory = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const auth = useSelector((state) => state.auth);

//   let { FileInput, openFileDialog, uploadToS3, files } = useS3Upload();

//   useEffect(() => {
//     const log = localStorage.getItem("loggedIn");
//     if (!log) return router.push("/login");
//   }, []);

//   //Tags
//   const [tags, setTags] = useState([]);
//   const filterTag = (removeIndex) => {
//     const existingTags = tags.filter((_, index) => index !== removeIndex);
//     setTags(existingTags);
//   };
//   const addTags = (e) => {
//     if (tags.length + 1 <= 7) {
//       if (e.keyCode == 32) {
//         if (!/^\s*$/.test(e.target.value.trim())) {
//           setTags([...tags, e.target.value.trim()]);
//           e.target.value = "";
//         }
//       }
//       if (e.keyCode == 13) {
//         if (!/^\s*$/.test(e.target.value.trim())) {
//           setTags([...tags, e.target.value.trim()]);
//           e.target.value = "";
//         }
//       }
//     } else {
//       dispatch(notifyError("Can not add more than 7 tags."));
//     }
//   };

//   //Enter post truned off
//   const checkKeyDown = (e) => {
//     if (e.keyCode === 13) e.preventDefault();
//   };

//   //Image posting
//   const [image, setImage] = useState({
//     viewImage: "",
//   });
//   const [imageLoad, setImageLoad] = useState(false);
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [isuploadedImage, setIsUploadedImage] = useState(false);
//   const imageHandler = async (e) => {
//     const newFile = e.target.files[0];
//     const errorImage = await imageValid(newFile);
//     if (errorImage) return dispatch(notifyError(errorImage));
//     const reader = new FileReader();
//     reader.onload = async () => {
//       if (reader.readyState === 2) {
//         setIsUploadedImage(true);
//         const image = await resizeFile(newFile);
//         const file = await convertBase64ToFile(image);
//         let { url, key } = await uploadToS3(file);
//         setUploadedImage(url);
//         setImage({ viewImage: reader.result });
//         setIsUploadedImage(false);
//       }
//     };
//     if (newFile) {
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   const [filesData, setFilesData] = useState([]);
//   const [uploadedData, setUploadedData] = useState([]);

//   const show = async (e) => {
//     if(filesData.length > 3) return dispatch(notifyError('Can not upload more than 3 files.'));
//     const files = [...Array.from(e.target.files)]
//     const formData = new FormData();

//     for (let i = 0; i < files.length; i++) {
//       const element = files[i];
//       formData.append(`file[${i}]`, element);
//     }
   
//     for (var value of formData.values()) {
//       console.log(value);
//     }
//     dispatch(notifyLoading(true));
//     const filesUpload = await formDataPost(
//       `image/upload`,
//       formData,
//       auth.token
//       );
//       console.log(filesUpload)
//       setUploadedData([...uploadedData, ...filesUpload?.fileLinks])
//       setFilesData([...Array.from(e.target.files), ...filesData]);
//       dispatch(notifyLoading(false));
//   };



//   const removeImage = async (img) => {
//     setImage({ viewImage: "" });
//   };

//   const initialState = { title: "", communityId: "", summary: "", body: "" };
//   const [post, setPost] = useState(initialState);

//   const handleChangeInput = (e) => {
//     const { name, value } = e.target;
//     setPost({ ...post, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errorData = storyValid(post.title, post.communityId);
//     if (errorData) return dispatch(notifyError(errorData));
//     const user_id = auth.user.user_id;
//     const email = auth.user.email;
//     const name = auth.user.username;
//     const image = uploadedImage
//       ? uploadedImage
//       : `https://fnm-uploads.s3.amazonaws.com/next-s3-uploads/${post.communityId}.png`;
//     // const data = { ...post, body, tags, user_id, image, email, name };
//     console.log(uploadedData)
//     const formData = new FormData();
//     formData.append("title", post?.title);
//     formData.append("communityId", post?.communityId);
//     formData.append("summary", post?.summary);
//     formData.append("body", post?.body);
//     formData.append("tags", tags);
//     formData.append("image", image);
//     formData.append("user_id", user_id);
//     for (let i = 0; i < uploadedData.length; i++) {
//       const element = uploadedData[i];
//       formData.append(`file[${i}]`, element.Location);
//       formData.append(`type[${i}]`, element.type);
//     }
//     formData.append("email", email);
//     formData.append("name", name);
//     for (var value of formData.values()) {
//       console.log(value);
//     }
//     dispatch(notifyLoading(true));
//     const storyData = await formDataPost(
//       `storyApi/post`,
//       formData,
//       auth.token
//     );
//     // axios
//     //   .post(`${process.env.BASE_URL}/api/storyApi/post/test`, formData, {
//     //     headers: {
//     //       Authorization: auth.token,
//     //     },
//     //   })
//     //   .then((res) => {
//     //     alert("File Upload success");
//     //   })
//     //   .catch((err) => alert("File Upload Error"));

//     dispatch(notifyLoading(false));
//     console.log(storyData.data.redirect);
//     if (storyData.success === true) return postSuccess(storyData.data.redirect);
//     if (storyData.err) return dispatch(notifyError(storyData.err));
//   };

//   const postSuccess = (url) => {
//     router.push(url);
//   };

//   if (auth.loading) return <PreloaderLg />;
//   return auth.user.user_id ? (
//     <div>
//       <HeadData />
//       <section className="post-story-sec">
//         {imageLoad && (
//           <div
//             className="text-center fw-bold d-flex justify-content-center position-fixed py-1 px-5 rounded"
//             style={{
//               zIndex: 10,
//               left: "40%",
//               right: 0,
//               width: "200px",
//               backgroundColor: "rgba(255, 217, 0, 0.767)",
//             }}
//           >
//             ...Uploading...
//           </div>
//         )}
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-12">
//               <div className="post-story-inner">
//                 <h3>Post your story here</h3>

//                 <form
//                   onSubmit={handleSubmit}
//                   // onKeyDown={(e) => checkKeyDown(e)}
//                 >
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="form-group">
//                         <label>Title</label>
//                         <input
//                           type="text"
//                           name="title"
//                           className="form-control"
//                           placeholder=""
//                           onChange={handleChangeInput}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="form-group">
//                         <label>Community Categories</label>
//                         <select
//                           className="form-control"
//                           name="communityId"
//                           onChange={handleChangeInput}
//                         >
//                           <option>Select Community</option>
//                           <option value="3">Eating Disorder</option>
//                           <option value="4">Weight Issues</option>
//                           <option value="5">Heart Diseases</option>
//                           <option value="6">Anxiety</option>
//                           <option value="7">Depression</option>
//                           <option value="1">Drug Addiction</option>
//                           <option value="8">Insecurity</option>
//                           <option value="9">Mental Health</option>
//                           <option value="10">Stress</option>
//                           <option value="2">Alchohol Addiction</option>
//                           <option value="11">Smoking</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="form-group">
//                         <label>Short Summary of Story</label>
//                         <input
//                           type="text"
//                           name="summary"
//                           className="form-control"
//                           placeholder=""
//                           onChange={handleChangeInput}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="form-group">
//                     <label>Thumbnail for Story</label>
//                     <label className="upload-file">
//                       {" "}
//                       Upload
//                       <input type="file" name="file" onChange={imageHandler} />
//                     </label>
//                     {!image.viewImage && !isuploadedImage && (
//                       <span>No file selected</span>
//                     )}
//                     {isuploadedImage && (
//                       <span>
//                         <img src="/uploading.gif" alt="uploading" />
//                       </span>
//                     )}
//                     {image.viewImage && (
//                       <span
//                         style={{ cursor: "pointer" }}
//                         onClick={() => removeImage(uploadedImage)}
//                       >
//                         <b>X</b> Remove Image
//                       </span>
//                     )}
//                     {image.viewImage && (
//                       <img
//                         src={image.viewImage}
//                         alt="imageUplaod"
//                         className="w-25 mt-2"
//                       />
//                     )}
//                   </div>
//                   <div className="form-group">
//                     <label>Body</label>
//                     <div className="p-2 my-4">
//                       <label className="upload-file">
//                         {" "}
//                         Add Images/videos
//                         <input
//                           type="file"
//                           accept="image/png , image/gif, image/jpeg, image/jpg, video/mp4,video/x-m4v,video/*"
//                           name="file"
//                           multiple
//                           onChange={(e) => show(e)}
//                         />
//                       </label>
//                       <div className="mt-4">
//                         {filesData.map((i, idx) => (
//                            <div className="d-flex" key={idx}>
//                             {i.name}{" "}
//                             <p
//                               className="ml-3 cursor fw-bold"
//                               onClick={() =>
//                                 setFilesData(
//                                   filesData.filter((i, id) => id !== idx)
//                                 )
//                               }
//                             >
//                               X
//                             </p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <textarea
//                       rows="10"
//                       name="body"
//                       className="form-control"
//                       placeholder=""
//                       onChange={handleChangeInput}
//                     />
//                   </div>
//                   <div className="form-group tag">
//                     <label>Tags</label>
//                     <div className="bs-example">
//                       <div className="bootstrap-tagsinput">
//                         {tags.map((tags, index) => (
//                           <span key={index} className="tag label label-info">
//                             {tags}
//                             <span
//                               style={{ cursor: "pointer" }}
//                               data-role="remove"
//                             >
//                               <b onClick={() => filterTag(index)}>X</b>
//                             </span>
//                           </span>
//                         ))}
//                       </div>
//                       <input
//                         type="text"
//                         placeholder="Enter Tag"
//                         name="tags"
//                         className="form-control"
//                         onKeyDown={addTags}
//                         data-role="tagsinput"
//                       />
//                       <small>
//                         Tags will help find your story. Please use valid tags.
//                       </small>
//                     </div>
//                   </div>
//                   <div className="form-group">
//                     <button className="post-btn" type="submit">
//                       Post Story
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   ) : (
//     <PreloaderLg />
//   );
// };

// export default TestStory;
