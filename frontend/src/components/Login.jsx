import { React, useState, useEffect } from "react";
import Headline2 from "../components/Headline2";
import postData from "../lib/axiosPost";
import { useUserContext } from "../contexts/userContext";
import Header from "./Header";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import getLogedInUser from "../lib/axiosFetcheLoggedInUser";
import checkLogin from "../auth/checkLogin";
import Headline1 from "./Headline1";

function Login() {
  const cookies = new Cookies();
  const { token, setToken, BASE_URL, me, setMe } = useUserContext();
  const [erroMessage, setErroMessage] = useState();

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  function getToken(e) {
    e.preventDefault();
    const userObj = {
      email: inputs.email,
      password: inputs.password,
    };
    const getData = async () => {
      try {
        const userData = await postData(BASE_URL, "users/login", userObj);
        if (userData) {
          const responseToken = userData.token;
          const userId = await checkLogin(BASE_URL, responseToken);
          const logedInUser = await getLogedInUser(BASE_URL, responseToken, userId);
          setMe(logedInUser);
          setToken(responseToken);

          cookies.set("token", responseToken, { path: "/" });
          cookies.set("userId", userId, { path: "/" });
          // console.log(cookies.get("token"));
          // console.log(cookies.get("userId"));

          setErroMessage("Logged in");
          window.location = "/overview?name=All";
        }
      } catch (error) {
        return setErroMessage(error.response.data.Message);
      }
    };
    getData();
  }
  useEffect(() => {
    //console.log(me);
  }, [me]);
  return (
    <>
      <Header />
      <Headline1 text={"Login"} />

      <div className="warning">{erroMessage}</div>
      <form onSubmit={getToken}>
        <div>
          <label htmlFor="email">Username</label>
          <br />
          <input
            required
            type="text"
            name="email"
            id="email"
            onChange={handleChange}
            value={inputs.email || ""}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            required
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
            value={inputs.password || ""}
          />
        </div>

        <button type="submit">Logg in</button>
      </form>
    </>
  );
}

export default Login;
