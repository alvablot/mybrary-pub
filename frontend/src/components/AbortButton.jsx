import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

function AbortButton() {
  return (
    <Link to="/overview">
      <button>Abort</button>
    </Link>
  );
}

export default AbortButton;
