import React from "react";

function UploaderButton(props) {
  const {setUploaderVis, setBgLayerVis} = props;
  return (
    <button
      onClick={() => {
        setUploaderVis("block");
        setBgLayerVis("block");
      }}
    >
      Upload image
    </button>
  );
}

export default UploaderButton;
