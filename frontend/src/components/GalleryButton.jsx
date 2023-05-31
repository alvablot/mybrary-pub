import React from "react";

function GalleryButton(props) {
  const { setGalVis, setBgLayerVis } = props;
  return (
    <button
      onClick={() => {
        setGalVis("block");
        setBgLayerVis("block");
      }}
    >
      Image gallery
    </button>
  );
}

export default GalleryButton;
