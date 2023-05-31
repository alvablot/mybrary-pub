import { React, useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";
import Headline1 from "./Headline1";
import postData from "../lib/axiosPost";
import ImgUploader from "./ImgUploader";
import fetchData from "../lib/axiosGet";
import Loader from "./Loader";
import ImageGallery from "./ImageGallery";
import AbortButton from "./AbortButton";
import ItemInputs from "./ItemInputs";
import UploaderButton from "./UploaderButton";
import Header from "./Header";

function AddItem() {
  const {
    apiImage,
    setApiImage,
    categories,
    setCategories,
    BASE_URL,
    setImages,
    images,
    setItems,
    items,
    me,
  } = useUserContext();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [warning, setWarning] = useState("");
  const [galVis, setGalVis] = useState("none");
  const [bgLayerVis, setBgLayerVis] = useState("none");
  const [uploaderVis, setUploaderVis] = useState("none");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [lender, setLender] = useState("");
  let home = true;

  const getData = async () => {
    const categoriesData = await fetchData(BASE_URL, "categories");
    const imagesData = await fetchData(BASE_URL, "images");
    setImages(imagesData.resources);
    setCategories(categoriesData);
    return imagesData;
  };
  // useEffect(() => {
  //   setApiImage(defaultImage);
  // }, []);

  if (!me)
    return (
      <>
        <Header />
        <div className="App">You are logged out</div>
      </>
    );

  if (!categories[0]) return <Loader />;
  return (
    <>
      <Header />
      <div className="gallery-layer" style={{ display: `${bgLayerVis}` }}></div>
      <div id="image-gallery" style={{ display: `${galVis}` }}>
        <ImageGallery
          images={images}
          visibility={galVis}
          setVisibility={setGalVis}
          setBgLayerVis={setBgLayerVis}
          apiImage={apiImage}
          setApiImage={setApiImage}
        />
      </div>
      <div id="image-uploader" style={{ display: `${uploaderVis}` }}>
        <ImgUploader
          setBgLayerVis={setBgLayerVis}
          setUploaderVis={setUploaderVis}
          uploaderVis={uploaderVis}
          getData={getData}
        />
      </div>

      <Headline1 text={"Add new item"} />
      <ItemInputs
        setGalVis={setGalVis}
        setBgLayerVis={setBgLayerVis}
        inputs={inputs}
        setInputs={setInputs}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
        setSelectedSubCategory={setSelectedSubCategory}
        setSelectedCategoryIndex={setSelectedCategoryIndex}
        selectedCategoryIndex={selectedCategoryIndex}
        lender={lender}
        setLender={setLender}
      />

      <div className="warning">{warning}</div>

      {/* <GalleryButton setGalVis={setGalVis} setBgLayerVis={setBgLayerVis} /> */}
      <UploaderButton setUploaderVis={setUploaderVis} setBgLayerVis={setBgLayerVis} />
      <button
        onClick={async () => {
          if (selectedCategory === "" || selectedSubCategory === "")
            return setWarning("Please choose categories");
          if (
            inputs.lender === "" ||
            inputs.lender === " " ||
            inputs.lender === undefined
          ) {
            home = true;
          } else {
            home = false;
          }
          const freshItem = {
            title: inputs.title,
            subtitle: inputs.subtitle,
            author: inputs.author,
            number: inputs.number,
            image: apiImage,
            rating: 2,
            description: inputs.description,
            category: selectedCategory,
            sub: selectedSubCategory,
            lender: inputs.lender,
            home: home,
            website: inputs.website,
          };
          console.log(inputs.lender);
          const itemsData = await postData(BASE_URL, "items/new", freshItem);
          setItems(itemsData);
          if (itemsData) {
            navigate(`/landing/?text=${inputs.title}&method=Added&id=${itemsData._id}`);
          }
        }}
      >
        Create
      </button>
      <AbortButton />
    </>
  );
}

export default AddItem;
