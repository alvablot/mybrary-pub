import fetchLogin from "../lib/axiosLogin";

async function checkLogin(host, token) {
  if (token) {
    const loginData = await fetchLogin(host, "users/me", token);
    if (loginData.loggedInUser) {
      return loginData.loggedInUser.id
      //return loginData;
    } else return "You're Out Baby!";
  }
}

export default checkLogin;
