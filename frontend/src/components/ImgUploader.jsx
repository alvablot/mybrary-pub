import { React, useState, useEffect } from "react";
import { useUserContext } from "../contexts/userContext";
import loaderGif from "../assets/loading1.gif";
import defaultImage from "../assets/img-icon.png";
import axios from "axios";

const ImgUploader = (props) => {
  const { apiImage, setApiImage, cloudName, preset, BASE_URL, categories } =
    useUserContext();
  const cloudApiUpload = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  const { getData, setUploaderVis, setBgLayerVis } = props;

  const [file, setFile] = useState("");
  const [fileStatus, setFileStatus] = useState("");
  const [imageCategory, setImageCategory] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const postImage = async (e) => {
    setIsDisabled(true);
    setApiImage(loaderGif);
    e.preventDefault();
    if (file.type.indexOf("image/") < 0) {
      return setFileStatus("Wrong file type");
    }
    let imgCat;
    if (imageCategory === "Category" || imageCategory === "") imgCat = "other";
    else imgCat = imageCategory;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);
    formData.append("tags", [imgCat]); //context
    const { data } = await axios.post(cloudApiUpload, formData);
    //console.log(data);
    setApiImage(data.secure_url);
    setUploaderVis("none");
    setBgLayerVis("none");
    setIsDisabled(false);
  };
  // useEffect(() => {
  //   console.log(imageCategory);
  // }, [imageCategory]);
  return (
    <>
      <button
        onClick={() => {
          setUploaderVis("none");
          setBgLayerVis("none");
        }}
      >
        Close
      </button>
      <br />
      {apiImage ? (
        <img
          className="upload-image"
          style={{ cursor: "default" }}
          src={apiImage}
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />
      ) : (
        <div className="upload-image">{fileStatus}</div>
      )}
      <form encType="multipart/form-data" onSubmit={postImage} method="post" action="">
        <select
          onChange={(e) => {
            setImageCategory(e.target.value);
          }}
        >
          <option>Category</option>
          {categories.map((category) => {
            return (
              <option key={`cat_${category._id}`} value={category.name}>
                {category.name}
              </option>
            );
          })}
        </select>
        <br />
        <input
          required
          className="file-input"
          type="file"
          name="img"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <br />
        <button disabled={isDisabled} type="submit">
          Upload image
        </button>
      </form>
    </>
  );
};

export default ImgUploader;
