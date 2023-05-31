import React from "react";
import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

function LandingPage() {
  const { search } = useLocation();
  const useQuery = () => {
    return React.useMemo(() => new URLSearchParams(search), [search]);
  };
  // const navigate = useNavigate();
  let query = useQuery();
  const text = query.get("text");
  const method = query.get("method");
  const id = query.get("id");

  useEffect(() => {
    setTimeout(() => {
      if(method === "Deleted") return window.location = `/overview/`;
      window.location = `/view-item/?name=Item&id=${id}`;
    }, 1000);
  }, []);

  return (
    <div className="visible-layer">
      <div className="modal-container">
        <div className="modal-content">
          <div>{`Successfully ${method}`}</div>
          <div>{`${text}`}</div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
