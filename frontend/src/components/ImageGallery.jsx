import { useState } from "react";
import defaultImage from "../assets/img-icon.png";

function ImageGallery(props) {
  const { setApiImage, apiImage, images, setBgLayerVis, bgLayerVis, setVisibility } =
    props;
  return (
    <>
      {/* <div className="gallery-layer" style={{ display: `${bgLayerVis}` }}> */}

      <button
        onClick={() => {
          setVisibility("none");
          setBgLayerVis("none");
        }}
      >
        Done
      </button>
      <h3 style={{ top: "30px" }}>Image gallery</h3>
      <div>
        <img
          className="choosen-image"
          src={apiImage}
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />
      </div>
      <div className="gallery-grid">
        {images.map((image) => {
          return (
            <img
              className="img-thumb"
              onClick={() => {
                setApiImage(image.secure_url);
                setVisibility("none");
                setBgLayerVis("none");
              }}
              key={image.asset_id}
              height="50"
              src={image.secure_url}
            />
          );
        })}
      </div>
      <br />
      <br />
    </>
  );
}
export default ImageGallery;
