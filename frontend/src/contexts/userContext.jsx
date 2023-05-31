//const BASE_URL = "http://localhost:3000/";
const BASE_URL = "https://examensarb.herokuapp.com/";
import Cookies from "universal-cookie";
import { createContext, useContext, useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import defaultImage from "../assets/img-icon.png";
import fetchData from "../lib/axiosGet";
import postData from "../lib/axiosPost";
import getLogedInUser from "../lib/axiosFetcheLoggedInUser";

const UserContext = createContext();

export function UserProvider(props) {
  const [users, setUsers] = useState({});
  const [items, setItems] = useState({});
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [token, setToken] = useState(null);
  const [apiImage, setApiImage] = useState(null);
  const [images, setImages] = useState([]);
  const [me, setMe] = useState(null);
  const [likes, setLikes] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [nextPageIndex, setNextPageIndex] = useState("");
  const [prevPageIndex, setPrevPageIndex] = useState("");

  const cookies = new Cookies();
  const localToken = cookies.get("token");
  const localUserId = cookies.get("userId");

  //const navigate = useNavigate();

  const cloudName = "cloudName";
  const preset = "preset";



  const getData = async () => {
    const usersData = await fetchData(BASE_URL, "users");
    const itemsData = await postData(BASE_URL, "items/All", {title: "asc"});
    const categoriesData = await fetchData(BASE_URL, "categories");
    const subsData = await fetchData(BASE_URL, "subs");
    const imagesData = await fetchData(BASE_URL, "images");
    setImages(imagesData.resources);
    setUsers(usersData);
    setItems(itemsData);
    setCategories(categoriesData);
    setSubs(subsData);
  };
  const checkUser = async () => {
    if (localToken && localUserId) {
      const logedInUser = await getLogedInUser(BASE_URL, localToken, localUserId);
      setToken(localToken);
      setMe(logedInUser);
      setLikes(logedInUser.likes);
      console.log("Inloggad");
    } else {
      console.log("Ej inloggad");
    }
  };
  useEffect(() => {
    setApiImage(defaultImage);
    getData().catch(console.error);

    checkUser();
  }, []);

  useEffect(() => {}, []);

  const providerValue = {
    users,
    setUsers,
    items,
    setItems,
    token,
    setToken,
    apiImage,
    setApiImage,
    categories,
    setCategories,
    subs,
    setSubs,
    BASE_URL,
    cloudName,
    preset,
    setImages,
    images,
    me,
    setMe,
    likes,
    setLikes,
    likedItems,
    setLikedItems,
    nextPageIndex,
    setNextPageIndex,
    prevPageIndex,
    setPrevPageIndex,
    getData,
    checkUser,
  };
  return (
    <UserContext.Provider value={providerValue}>{props.children}</UserContext.Provider>
  );
}

export function useUserContext() {
  const providerValue = useContext(UserContext);
  return providerValue;
}
