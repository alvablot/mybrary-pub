import React from "react";
import { useEffect, useState } from "react";
import Headline2 from "./Headline2";
import { useUserContext } from "../contexts/userContext";
import defaultImage from "../assets/img-icon.png";
import editImg from "../assets/edit.png";

function ItemInputs(props) {
  const { categories, subs, setSubs, apiImage, getData } = useUserContext();
  let [imgEditIcon, setImgEditIcon] = useState({ left: 0, top: 0, display: "none" });
  const [subIndex, setSubIndex] = useState([]);
  let subArray = [];
  let selCat = [];
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const {
    inputs,
    setInputs,
    setSelectedCategory,
    selectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    setSelectedCategoryIndex,
    selectedCategoryIndex,
    setGalVis,
    setBgLayerVis,
    setWarning,
  } = props;

  useEffect(() => {
    subs.map(() => {});
    const filteredCategory = categories.filter((cat) => cat.category === subs.category);
    console.log(filteredCategory);
  }, [selectedCategory]);

  useEffect(() => {
    console.log(selectedCategory, selectedSubCategory);
  }, [selectedCategory, selectedSubCategory]);

  return (
    <>
      {apiImage ? (
        <>
          <span
            className="header-link"
            style={{ position: "relative", top: "20px" }}
            onClick={() => {
              setGalVis("block");
              setBgLayerVis("block");
              getData();
            }}
          >
            Image gallery
          </span>
          <br />
          <img
            onClick={() => {
              setGalVis("block");
              setBgLayerVis("block");
              getData();
            }}
            className="upload-image"
            src={apiImage}
            onError={(e) => {
              e.target.src = defaultImage;
            }}
          />{" "}
        </>
      ) : (
        <div className="upload-image">{fileStatus}</div>
      )}
      <br />
      <div>
        <label htmlFor="title">Title</label>
        <br />
        <input
          required
          type="text"
          name="title"
          id="title"
          onChange={handleChange}
          value={inputs.title || ""}
        />
      </div>
      <div>
        <label htmlFor="subtitle">Subtitle</label>
        <br />

        <input
          type="text"
          name="subtitle"
          id="subtitle"
          onChange={handleChange}
          value={inputs.subtitle || ""}
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <br />
        <input
          type="text"
          name="author"
          id="author"
          onChange={handleChange}
          value={inputs.author || ""}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <br />
        <input
          type="text"
          name="website"
          id="website"
          onChange={handleChange}
          value={inputs.website || ""}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <br />
        <textarea
          name="description"
          id="description"
          defaultValue={inputs.description || ""}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <label htmlFor="lender">Borrower</label>
        <br />
        <input
          type="text"
          name="lender"
          id="lender"
          onChange={handleChange}
          value={inputs.lender || ""}
        />
      </div>
      <div>
        <select
          onChange={(e) => {
            subs.map((sub) => {
              const filteredSub = subs.filter(
                (sub) => sub.index === parseInt(e.target.value)
              );
              subArray = filteredSub;
            });
            setSubIndex(subArray[0].subs);
            setSelectedCategory(selCat[e.target.selectedIndex - 1]);
            setSelectedSubCategory("");
          }}
        >
          {categories[0] ? (
            <option value="0">Category</option>
          ) : (
            <option value="0">Loading...</option>
          )}
          {categories.map((category, i) => {
            selCat[i] = category.name;
            return (
              <option
                name="af"
                id="asvs"
                key={`cat_opt_${category._id}`}
                value={category.index}
              >
                {category.name}
              </option>
            );
          })}
        </select>
        <select
          onChange={(e) => {
            if (parseInt(e.target.value) < 0) return setSelectedSubCategory("");
            setSelectedSubCategory(subIndex[parseInt(e.target.value)]);
          }}
        >
          {subs[0].subs ? (
            <option value="0">Subcategory</option>
          ) : (
            <option value="0">Loading...</option>
          )}

          {subIndex.map((sub, i) => {
            return (
              <option key={`cat_opt_${i}`} value={i}>
                {sub}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}

export default ItemInputs;
