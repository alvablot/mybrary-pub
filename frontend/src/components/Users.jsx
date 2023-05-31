import React from "react";
import { useUserContext } from "../contexts/userContext";
import Headline2 from "./Headline2";

function Users() {
  const { users, setUsers, BASE_URL } = useUserContext();
  return (
    <>
      <Headline2 text={"All users"} />
      {users.map((user) => {
        return (
          <div  key={`users_${user._id}`}>
            <div key={`name_${user._id}`}>
              {user.firstName} {user.lastName}
            </div>
            <div key={`email_${user._id}`}>{user.email}</div>
          </div>
        );
      })}
    </>
  );
}

export default Users;
