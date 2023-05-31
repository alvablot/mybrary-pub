import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import left from "../assets/left.png";

function Back(props) {
  const navigate = useNavigate();
  return (
    <div
      className="back"
      onClick={() => {
        navigate(-1);
      }}
    >
      <img src={left} />
    </div>
  );
}

export default Back;
