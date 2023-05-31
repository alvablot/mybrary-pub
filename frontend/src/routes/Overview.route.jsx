import { useEffect } from "react";
import { useUserContext } from "../contexts/userContext";
import Loader from "../components/Loader";
import Headline1 from "../components/Headline1";

import Items from "../components/Items";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

function Overview() {
  const { users, items, token, me, setMe } = useUserContext();

  useEffect(() => {
    //console.log(localStorage.getItem("userId"));
  }, []);

  if (!users[0] || !items[0]) {
    return <Loader />;
  }

  return (
    <>
    {/* <Header />
      <Headline1 text={"Media library"} /> */}
      <Items />
    </>
  );
}

export default Overview;
