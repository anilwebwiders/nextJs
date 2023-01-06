import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifyError } from "../../store/notify/action";
import { imageValid } from "../../utils/validCheck";
import { useS3Upload } from "next-s3-upload";
import { convertBase64ToFile, resizeFile } from "../../utils/imageShrink";

/* eslint-disable @next/next/no-img-element */
const UploadImage = ({ setUploadedImage, getUser }) => {
  let { FileInput, openFileDialog, uploadToS3, files } = useS3Upload();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [image, setImage] = useState({ viewImage: "" });
  const [isuploadedImage, setIsUploadedImage] = useState(false);
  const imageHandler = async (e) => {
    const newFile = e.target.files[0];
    console.log("🚀 ~ file: UploadImage.js:17 ~ imageHandler ~ newFile", newFile)
    

    const errorImage = await imageValid(newFile);
    if (errorImage) return dispatch(notifyError(errorImage));

    const image = await resizeFile(newFile);
    const file = await convertBase64ToFile(image);
    console.log("🚀 ~ file: UploadImage.js:25 ~ imageHandler ~ file", file)
    console.log("🚀 ~ file: UploadImage.js:25 ~ imageHandler ~ image", image)
    
    
    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.readyState === 2) {
        setIsUploadedImage(true);
        let { url } = await uploadToS3(file);
        console.log("🚀 ~ file: UploadImage.js:34 ~ reader.onload= ~ url", url)
        // console.log(url);
        setUploadedImage(url);
        setIsUploadedImage(false);
        setImage({ viewImage: reader.result });
      }
    };
    if (newFile) {
      reader.readAsDataURL(file);
    }
  };
  const removeImage = () => {
    setImage({ viewImage: "" });
  };

  return (
    <div>
      <div className="form-group change-avatar mt-5">
        {/* <label className="mb-2">Change profile picture</label> */}
        {!isuploadedImage && <>
          {image.viewImage ? (
            <img src={image.viewImage} alt="user"  className="image-Short"/>
          ) : (
            <img src={auth.user.avatar} alt="user"  className="image-Short"/>
          )}
        </>}
        {isuploadedImage ? (
          <img src="/avatar.png" alt="uploading" />
        ) : (
          <label className="upload-picture">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-camera-fill" viewBox="0 0 16 16">
  <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
  <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
</svg>
            <input type="file" onChange={imageHandler} />
          </label>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
