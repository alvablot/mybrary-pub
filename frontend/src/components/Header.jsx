import React from "react";
import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/userContext";
import Cookies from "universal-cookie";
import defaultImage from "../assets/img-icon.png";
import { useParams, NavLink, Link, useNavigate } from "react-router-dom";
import profileImg from "../assets/profile.png";
import newImg from "../assets/new_item.png";
import itemsImg from "../assets/items.png";

function Header(props) {
  const { users, items, token, me, setMe, setApiImage, getData, setItems } = useUserContext();

  useEffect(() => {
    //console.log(me);
  }, [me]);

  return (
    <div id="header-container">
      <div className="header-item">{" "}</div>
      <div className="header-item">
        <NavLink to="/overview?name=All">
          <span
            className="header-link"
            onClick={() => {
              getData();
            }}
          >
            <img src={itemsImg} width="20" />
          </span>
        </NavLink>
      </div>
      <div className="header-item">{me ? <NewItemLink /> : ""}</div>
      <div className="header-item">{me ? <LogoutButton me={me} /> : <LoginButton />} </div>
      <div className="header-item">{" "}</div>
    </div>
  );
}

export default Header;

export function LogoutButton(props) {
  const [loginVis, setLoginVis] = useState("hidden");
  const cookies = new Cookies();
  return (
    <>
      <Link to="/user-profile">
        <img
          src={profileImg}
          width="20"
          onMouseMove={() => {
            setLoginVis("visible");
          }}
        />
      </Link>
      <span
        className="filterLinks"
        onClick={() => {
          cookies.remove("token", { path: "/" });
          cookies.remove("userId", { path: "/" });
          window.location = "/overview";
        }}
        onMouseOut={() => {
          setLoginVis("hidden");
        }}
        id="login"
        style={{ visibility: `${loginVis}`, position: "absolute" }}
      >
        Log out
      </span>
    </>
  );
}

export function LoginButton(props) {
  const [loginVis, setLoginVis] = useState("hidden");
  const cookies = new Cookies();
  return (
    <>
      <img
        src={profileImg}
        width="20"
        onMouseMove={() => {
          setLoginVis("visible");
        }}
      />
      <Link to="/login">
        <span
          onMouseOut={() => {
            setLoginVis("hidden");
          }}
          id="login"
          style={{ visibility: `${loginVis}`, position: "absolute" }}
          className="filterLinks"
        >
          Log in
        </span>
      </Link>
    </>
  );
}

export function NewItemLink(props) {
  const { setApiImage, setItems } = useUserContext();
  return (
    <NavLink
      onClick={() => {
        // setItems({});
        setApiImage(defaultImage);
      }}
      to="/new_item"
    >
      <img src={newImg} width="20" />
    </NavLink>
  );
}
