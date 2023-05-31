import React from "react";
import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";
import updateData from "../lib/axiosPut";
import ImgUploader from "./ImgUploader";
import fetchData from "../lib/axiosGet";
import postData from "../lib/axiosPost";
import Loader from "./Loader";
import Modal from "./Modal";
import ImageGallery from "./ImageGallery";
import AbortButton from "./AbortButton";
import ItemInputs from "./ItemInputs";
import UploaderButton from "./UploaderButton";
import Header from "./Header";
import Headline1 from "./Headline1";

function EditItem() {
  const {
    apiImage,
    setApiImage,
    setCategories,
    BASE_URL,
    images,
    setImages,
    me,
  } = useUserContext();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [galVis, setGalVis] = useState("none");
  const [bgLayerVis, setBgLayerVis] = useState("none");
  const [uploaderVis, setUploaderVis] = useState("none");
  const [lender, setLender] = useState("");
  let home = true;
  // const [images, setImages] = useState([]);

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});

  const [item, setItem] = useState("");
  const [modalText, setModalText] = useState("");
  const hidden = "hidden-layer";
  const visible = "visible-layer";
  const [modal, setModal] = useState(hidden);

  const { search } = useLocation();
  const useQuery = () => {
    return React.useMemo(() => new URLSearchParams(search), [search]);
  };
  let query = useQuery();
  const name = query.get("name");
  const id = query.get("id");
  const message404 = "Item not found";

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

  const getData = async () => {
    let itemData;
    try {
      itemData = await postData(BASE_URL, `items/${id}`);
      const categoriesData = await fetchData(BASE_URL, "categories");
      const imagesData = await fetchData(BASE_URL, "images");
      setImages(imagesData.resources);
      setItem(itemData);
      setInputs(itemData);
      setApiImage(itemData.image);
      setSelectedCategory(itemData.category);
      setSelectedSubCategory(itemData.sub);
      setCategories(categoriesData);
    } catch (error) {
      if (error.response.status === 404) itemNotFound();
    } finally {
      if (!itemData) {
        const timer = setTimeout(() => {
          itemNotFound();
        }, 1000);
      }
    }
  };
  const getImage = async () => {
    try {
      const imagesData = await fetchData(BASE_URL, "images");
      setImages(imagesData.resources);
    } catch (error) {
      if (error.response.status === 404) itemNotFound();
    }
  };

  useEffect(() => {
    if (!id) window.location = "/overview?name=All";
    getData().catch(console.error);
  }, []);

  // useEffect(() => {
  //   getImage().catch(console.error);
  // }, [setApiImage]);
  if (!me)
    return (
      <>
        <Header />
        <div className="App">You are logged out</div>
      </>
    );
  if (!item) {
    return <Loader />;
  }
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
      <div className={modal}>
        <Modal
          text={modalText}
          host={BASE_URL}
          endpoint={`items/${id}`}
          hideShowModal={hideShowModal}
        />
      </div>
      <Headline1 text={"Edit item"} />
      <div>
        <img
          src={`http://alvablot.se/library-icons/${item.category}.png`}
          width="25"
          title={item.category}
        />
      </div>
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
      <br />
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
          const response = await updateData(BASE_URL, `items/${id}`, freshItem);
          if (response) {
            navigate(`/landing/?text=${inputs.title}&method=Updated&id=${id}`);
          }
        }}
      >
        Update
      </button>
      <button
        onClick={() => {
          hideShowModal("Delete item. Are you sure?", visible);
        }}
      >
        Delete {item.category ? item.category : ""}
      </button>
      <AbortButton />
    </>
  );
}

export default EditItem;
