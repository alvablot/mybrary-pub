import React from "react";
import { useState, useEffect } from "react";
import { useUserContext } from "../contexts/userContext";
import updateData from "../lib/axiosPut";
import patchData from "../lib/axiosPatch";
import down from "../assets/down.png";
import Headline2 from "./Headline2";

function EditUser() {
  const { BASE_URL, me } = useUserContext();
  const [inputs, setInputs] = useState({});
  const [warning, setWarning] = useState("");
  const [editUserVisibility, setEditUserVisibility] = useState("none");
  const [editPasswordVisibility, setEditPasswordVisibility] = useState("none");
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  return (
    <>
      <span
        className="header-link"
        onClick={() => {
          editUserVisibility === "block"
            ? setEditUserVisibility("none")
            : setEditUserVisibility("block");
        }}
      >
        <img src={down} className="down-img" />
        Edit User
      </span>
      <div className="gallery-layer" style={{ display: `${editUserVisibility}` }}></div>
      <div id="image-uploader" style={{ display: `${editUserVisibility}` }}>
        <Headline2 text={"Edit user"} />

        <form>
          <div>
            <label htmlFor="firstName">First name</label>
            <br />
            <input
              type="text"
              name="firstName"
              id="firstName"
              onChange={handleChange}
              value={inputs.firstName || me.firstName}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last name</label>
            <br />
            <input
              type="text"
              name="lastName"
              id="lastName"
              onChange={handleChange}
              value={inputs.lastName || me.lastName}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="text"
              name="email"
              id="email"
              onChange={handleChange}
              value={inputs.email || me.email}
            />
          </div>
          <div>
            <label htmlFor="notes">Notes</label>
            <br />
            <textarea
              name="notes"
              id="notes"
              onChange={handleChange}
              defaultValue={inputs.notes || me.notes}
            />
          </div>
          <button
            onClick={async (e) => {
              e.preventDefault();
              const freshUser = {
                firstName: inputs.firstName || me.firstName,
                lastName: inputs.lastName || me.lastName,
                email: inputs.email || me.email,
                notes: inputs.notes || me.notes,
                likes: me.likes,
              };
              // console.log(freshUser);
              try {
                const response = await updateData(BASE_URL, `users/${me._id}`, freshUser);
                if (response) {
                  window.location = `/user-profile`;
                }
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Save
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setEditUserVisibility("none");
            }}
          >
            Abort
          </button>
        </form>
        <span
          className="header-link"
          onClick={() => {
            editPasswordVisibility === "block"
              ? setEditPasswordVisibility("none")
              : setEditPasswordVisibility("block");
          }}
        >
          <img src={down} className="down-img" />
          Uppdate password
        </span>
        <br />
        <div id="update-password" style={{ display: `${editPasswordVisibility}` }}>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const freshPassword = {
                oldPassword: inputs.oldPassword,
                newPassword: inputs.newPassword,
              };
              // console.log(freshUser);
              try {
                const response = await patchData(
                  BASE_URL,
                  `users/${me._id}`,
                  freshPassword
                );
                if (response) {
                  setWarning(response);
                  window.location = `/user-profile`;
                }
              } catch (error) {
                console.log(error);
                if (error.response.status === 403)
                  setWarning("Old password is incorrect");
              }
            }}
          >
            <div>
              {warning ? <div className="warning">{warning}</div> : ""}
              <label htmlFor="oldPassword">Old</label>
              <br />
              <input
                required
                type="password"
                name="oldPassword"
                id="oldPassword"
                onChange={handleChange}
                value={inputs.oldPassword || ""}
              />
            </div>
            <div>
              <label htmlFor="newPassword">New</label>
              <br />
              <input
                required
                type="password"
                name="newPassword"
                id="newPassword"
                onChange={handleChange}
                value={inputs.newPassword || ""}
              />
            </div>
            <button>Uppdate</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditUser;
