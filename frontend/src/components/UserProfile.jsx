import React from "react";
import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";
import Header from "./Header";
import Headline1 from "./Headline1";
import Loader from "./Loader";
import dateFormat from "../utils/dateStamp";
import patchData from "../lib/axiosPatch";
import EditUser from "./EditUser";
import down from "../assets/down.png";

function UserProfile() {
  const { BASE_URL, me, items, likedItems, setLikedItems, checkUser } = useUserContext();
  const [renderLikedItems, setRenderLikedItems] = useState([]);
  const [lastLogIn, setLastLogIn] = useState("");
  let likeArray = [];

  function updateLikes() {
    if (me && items) {
      // const date = dateFormat(me.lastLogIn);
      // setLastLogIn(date);
      items.map((item) => {
        const filteredLikes = me.likes.filter((like) => like === item._id);
        if (filteredLikes.length > 0) likeArray.push({ title: item.title, id: item._id });
      });
      setLikedItems(likeArray);
    }
  }

  useEffect(() => {
    updateLikes();
  }, [items]);

  useEffect(() => {
    console.log(likedItems);
  }, [likedItems]);

  if (!me || !items || !renderLikedItems)
    return (
      <>
        {" "}
        <Header />
        <Loader />
      </>
    );
  return (
    <>
      <Header />
      <Headline1 text={"My profile"} />
      <EditUser lastLogIn={lastLogIn} />

      <div>
        Welcome {me.firstName} {me.lastName}
      </div>
      <div className="notes">{me.notes}</div>
      <div>Last logged in {me.lastLogIn ? dateFormat(me.lastLogIn) : ""}</div>
      <div>
        <h4>Favourite items</h4>
        {likedItems.map((like, i) => (
          <div key={`link_${like.id}`}>
            <span className="likelist">
              <Link to={`/view-item/?id=${like.id}`}>{like.title}</Link>
            </span>
            <span
              onClick={async () => {
                try {
                  const userData = await patchData(BASE_URL, `users/${me._id}`, {
                    likes: like.id,
                  });
                  console.log(userData);
                  checkUser();
                  const newArray = likedItems;
                  newArray.splice(i, 1);
                  setLikedItems([...newArray]);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              <span className="x">x</span>
            </span>
            <br />
          </div>
        ))}
      </div>
    </>
  );
}

export default UserProfile;
