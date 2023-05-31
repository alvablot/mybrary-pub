import React from "react";
import deleteData from "../lib/axiosDelete";
import { useLocation, Link, useNavigate } from "react-router-dom";

function Modal(props) {
  const { text, host, endpoint, hideShowModal } = props;
  const navigate = useNavigate();

  return (
    <div className="modal-container">
      <div className="modal-content">
        <div>{text}</div>
        <button
          onClick={async () => {
            const response = await deleteData(host, endpoint);
            if (response) navigate(`/landing?text=${response.title}&method=Deleted`);
          }}
        >
          Yes
        </button>
        <button
          onClick={async () => {
            const response = await hideShowModal(null, "hidden-layer");
            //console.log(response);
          }}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default Modal;
