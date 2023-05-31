import React from "react";
import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";
import fetchData from "../lib/axiosGet";
import postData from "../lib/axiosPost";
import Headline2 from "./Headline2";
import Loader from "./Loader";
import patchData from "../lib/axiosPatch";
import Modal from "./Modal";
import defaultImage from "../assets/img-icon.png";
import editImg from "../assets/edit.png";
import deleteImg from "../assets/delete.png";
import img404 from "../assets/404.png";
import Header from "./Header";
import dateFormat from "../utils/dateStamp";
import Back from "./Back";

function Item() {
  const {
    BASE_URL,
    me,
    likes,
    setLikes,
    checkUser,
    items,
    nextPageIndex,
    setNextPageIndex,
    prevPageIndex,
    setPrevPageIndex,
  } = useUserContext();
  const [item, setItem] = useState("");
  const [itemId, setItemId] = useState("");
  const [modalText, setModalText] = useState("");

  const [nextPageURL, setNextPageURL] = useState("");
  const [prevPageURL, setPrevPageURL] = useState("");
  const [liked, setLiked] = useState("Not liked");
  const hidden = "hidden-layer";
  const visible = "visible-layer";
  const [modal, setModal] = useState(hidden);
  const navigate = useNavigate();

  let moveX;
  let startX;
  let fireX;

  const { search } = useLocation();
  const useQuery = () => {
    return React.useMemo(() => new URLSearchParams(search), [search]);
  };
  let query = useQuery();
  const name = query.get("name");
  const id = query.get("id");

  const message404 = "Item not found";

  async function pushLikes() {
    const like = { likes: item._id };
    try {
      const userData = await patchData(BASE_URL, `users/${me._id}`, like);
      setLikes(userData.likes);
      checkUser();
    } catch (error) {
      console.log(error);
    }
  }

  function itemNotFound() {
    setItem({
      _id: "",
      title: message404,
      author: "",
      description: "",
      image: "",
    });
  }

  function hideShowModal(text, vis) {
    setModalText(text);
    setModal(vis);
  }

  function setTheLikes() {
    const filterLikes = likes.filter((like) => like === item._id);
    if (itemId === filterLikes[0]) setLiked(false);
    else setLiked(true);
  }

  const idArray = [];
  function makeIdArray(id) {
    if (items[0]) {
      items.map((element, i) => {
        idArray[i] = element._id;
      });
    }

    setNextPageIndex(idArray[idArray.indexOf(id) + 1]);
    setPrevPageIndex(idArray[idArray.indexOf(id) - 1]);
    if (id === undefined) window.location = "/overview";
    if (idArray.indexOf(id) === 0) setPrevPageURL(`/overview`);
    if (idArray.indexOf(id) === idArray.length - 1) setNextPageURL(`/overview`);
  }

  useEffect(() => {
    if (!id) navigate("/overview?name=All");
    const getData = async () => {
      let itemsData;
      try {
        itemsData = await postData(BASE_URL, `items/${id}`);
        setItem(itemsData);
        setItemId(itemsData._id);
        if (itemsData.length < 1) itemNotFound();
      } catch (error) {
        if (error.response.status === 404) itemNotFound();
      } finally {
        if (!itemsData) {
          const timer = setTimeout(() => {
            itemNotFound();
          }, 1000);
        }
      }
    };
    makeIdArray(id);
    getData();
  }, [id]);

  useEffect(() => {
    setTheLikes();
  }, [likes, item]);

  useEffect(() => {
    makeIdArray(id);
  }, [items]);

  useEffect(() => {
    if (prevPageIndex === undefined) setPrevPageURL(`/overview`);
    else setPrevPageURL(`/view-item/?id=${prevPageIndex}`);
    if (nextPageIndex === undefined) setNextPageURL(`/overview`);
    else setNextPageURL(`/view-item/?id=${nextPageIndex}`);
  }, [nextPageIndex]);

  if (!item) {
    return <Loader />;
  }

  return (
    <>
      <Header />

      <div className={modal}>
        <Modal
          text={modalText}
          host={BASE_URL}
          endpoint={`items/${id}`}
          hideShowModal={hideShowModal}
        />
      </div>

      <div id="item-list">
        <div id="details-container">
          <Back />
          <div className="top">
            {me ? <EditButton item={item} /> : ""}
            {me ? (
              <DeleteButton
                item={item}
                visible={visible}
                hideShowModal={hideShowModal}
                message404={message404}
              />
            ) : (
              ""
            )}
          </div>
          <span id="prev-item">
            <Link to={prevPageURL}>Prev item </Link>
          </span>{" "}
          <span id="next-item">
            <Link to={nextPageURL}>Next item </Link>
          </span>
          <div>{item ? <Headline2 text={item.title} /> : message404}</div>
          <h4>{item.author}</h4>
          {(
            <img
              onTouchMove={(e) => {
                moveX = e.targetTouches[0].clientX;
                fireX = moveX - startX;
                if (fireX > 100) navigate(prevPageURL);
                if (fireX < -100) navigate(nextPageURL);
              }}
              onTouchStart={(e) => {
                startX = e.targetTouches[0].clientX;
              }}
              className="detail-image"
              src={item.image}
              onError={(e) => {
                e.target.src = defaultImage;
              }}
            />
          ) || ""}
          <br />
          <h4>{item.subtitle}</h4>
          {item.home === false ? (
            <div className="warning">
              {item.lender} has borrowed this {item.category}
            </div>
          ) : (
            ""
          )}
          <div key={`description_${item._id}`}>
            <pre>{item.description || ""}</pre>
          </div>
          {liked}
          <div>
            <i>
              {" "}
              <img
                style={{ position: "relative", top: "5px" }}
                src={`https://alvablot.se/library-icons/${item.category}.png`}
                width="25"
                title={item.category}
              />{" "}
              <b>
                {item.category || ""} / {item.sub || ""}
              </b>
            </i>
          </div>
          {item.website ? (
            <>
              <br />
              <a href={item.website}>Website</a>
            </>
          ) : (
            ""
          )}
          <div id="like" onClick={pushLikes}>
            {liked ? (
              <>
                {me ? (
                  <img
                    style={{ cursor: "grab" }}
                    className="like-ikon"
                    width="25"
                    src="https://alvablot.se/library-icons/unlike-button-icon.webp"
                    title="like"
                  />
                ) : (
                  ""
                )}

                <span className="like-text">{me ? "Like" : ""} </span>
              </>
            ) : (
              <>
                {me ? (
                  <img
                    style={{ cursor: "grab" }}
                    className="like-ikon"
                    width="25"
                    src="https://alvablot.se/library-icons/like-button-icon.webp"
                    title="like"
                    onError={(e) => {
                      e.target.src = img404;
                    }}
                  />
                ) : (
                  ""
                )}

                <span className="like-text">{me ? "Liked" : ""}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Item;

export function EditButton(props) {
  return (
    <div className="left">
      <Link to={`/edit-item/?id=${props.item._id}`}>
        <img src={editImg} width="20" height="20" title="Edit item" />
      </Link>
    </div>
  );
}

export function DeleteButton(props) {
  return (
    <div className="right">
      {" "}
      {props.item.title !== props.message404 ? (
        <img
          src={deleteImg}
          width="20"
          height="20"
          title="Delete item"
          onClick={() => {
            props.hideShowModal("Delete item. Are you sure?", props.visible);
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
}
