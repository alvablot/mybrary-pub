import React from "react";
import { useState, useEffect } from "react";
import { useUserContext } from "../contexts/userContext";
import Headline2 from "./Headline2";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import defaultImage from "../assets/img-icon.png";
import logo from "../assets/mybrary.png";
import filterIcon from "../assets/filter.png";
import sortIcon from "../assets/sort.png";
import fetchData from "../lib/axiosGet";
import postData from "../lib/axiosPost";
import Header from "./Header";
import Headline1 from "./Headline1";

function Items() {
  const { items, setItems, BASE_URL, categories, getData, likes, setLikes } =
    useUserContext();
  const [category, setCategory] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [sortView, setSortView] = useState(" /Title");
  const [renderItems, setRenderItems] = useState([]);
  const [sortState, setSortState] = useState({ title: "asc" });

  const navigate = useNavigate();
  const { search } = useLocation();
  const useQuery = () => {
    return React.useMemo(() => new URLSearchParams(search), [search]);
  };
  let query = useQuery();
  let name = query.get("name");
  if (!name) name = "All";
  const sort = query.get("sort");

  async function setFilters() {
    setSearchValue("");
    setCategory(name);
    try {
      const filteredItemsData = await postData(BASE_URL, `items/${name}`, sortState);
      setItems(filteredItemsData);
      setRenderItems(filteredItemsData);
    } catch (error) {
      console.log(error.response.statusText);
      if (error.response.status === 404) navigate("/overview?name=All");
    }
  }

  useEffect(() => {
    setRenderItems(items);
  }, []);

  useEffect(() => {
    setFilters();
  }, [name, sortState]);

  return (
    <>
      <Header />
      <a href="/overview?name=All">
        <img
          src={logo}
          width="50%"
          style={{ marginTop: "50px", maxWidth: "600px", minWidth: "300px" }}
        />
      </a>
      <Headline2 text={`${category}${sortView}`} />
      <form>
        <label htmlFor="search-input">Search title </label>
        <input
          id="search-input"
          onChange={(e) => {
            setSearchValue(e.target.value);
            const { value } = e.target;
            if (value === " " || value === "") return setRenderItems(items);
            const searchData = items.filter(
              (item) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
            );
            setRenderItems(searchData);
          }}
          value={searchValue}
        />
      </form>
      {categories.map((category) => {
        return (
          <Link to={`/overview?name=${category.name}`} key={`link_${category._id}`}>
            <span className="filterLinks" key={category._id}>
              {category.name}{" "}
            </span>
          </Link>
        );
      })}
      <br />
      Order by
      <br />
      <span
        className="filterLinks"
        onClick={() => {
          setSortState({ title: "asc" });
          setSortView(" /Title");
        }}
      >
        Title
      </span>
      <span
        className="filterLinks"
        onClick={() => {
          setSortState({ dateCreated: "desc" });
          setSortView(" /Date");
        }}
      >
        Date
      </span>
      <span
        className="filterLinks"
        onClick={() => {
          setSortState({ category: "asc" });
          setSortView(" /Category");
        }}
      >
        Category
      </span>
      <span
        className="filterLinks"
        onClick={() => {
          setSortState({ sub: "asc" });
          setSortView(" /Subcategory");
        }}
      >
        Subcategory
      </span>
      <span
        className="filterLinks"
        onClick={() => {
          setSortState({ author: "asc" });
          setSortView(" /Author");
        }}
      >
        Author
      </span>
      <div className="grid-container">
        {renderItems.map((item) => {
          return (
            <div key={`items_${item._id}`} className="grid-item">
              <div className="icon">
                <img
                  src={`https://alvablot.se/library-icons/${item.category}.png`}
                  width="25"
                  title={item.category}
                />
              </div>
              <div key={`title_${item._id}`}></div>
              <div className="items-image-container">
                <Link to={`/view-item/?id=${item._id}`}>
                  <img
                    className="items-image"
                    width="100%"
                    src={item.image}
                    onError={(e) => {
                      e.target.src = defaultImage;
                    }}
                  />
                </Link>
              </div>
              <div className="grid-title">
                {item.author ? (
                  <>
                    <b>{item.title}</b>
                    <br />
                    <span className="author">{item.author}</span>
                  </>
                ) : (
                  <>
                    <b>{item.title}</b>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Items;
