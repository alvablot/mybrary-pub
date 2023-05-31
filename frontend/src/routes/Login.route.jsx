import { React, useState, useEffect } from "react";
import Headline2 from "../components/Headline2";
import Navbar from "../components/Navbar";
import postData from "../lib/axiosPost";
import { useUserContext } from "../contexts/userContext";
import Login from "../components/Login";
import Header from "../components/Header";

function LoginRoute() {
  return (
    <>
      <Login />
    </>
  );
}

export default LoginRoute;
