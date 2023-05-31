import React from "react";
import loaderGif from "../assets/loading1.gif";

function Loader() {
  return (
    <>
      <div className="loading-content">
        <div>
          <img src={loaderGif} width="50" alt="Loading..." />
        </div>
      </div>
    </>
  );
}

export default Loader;
