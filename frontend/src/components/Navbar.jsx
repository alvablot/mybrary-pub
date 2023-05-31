import React from "react";
import { Outlet, NavLink, Link, useLoaderData, Form, redirect } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";
import defaultImage from "../assets/img-icon.png";
function Navbar() {
  const { users, items, token, me, setMe, setApiImage } = useUserContext();
  return (
    <>
      <nav className="crumbs">
        <ol>
          <li className="crumb">
            <NavLink
              to={`/overview`}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              Overview
            </NavLink>
          </li>
          <li className="crumb">
            <NavLink
              to={"/login"}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              Login
            </NavLink>
          </li>
          {me ? (
            <li className="crumb">
              <NavLink
                onClick={() => {
                  setApiImage(defaultImage);
                }}
                to={"/new_item"}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                New Item
              </NavLink>
            </li>
          ) : (
            ""
          )}
        </ol>
      </nav>
    </>
  );
}

export default Navbar;
