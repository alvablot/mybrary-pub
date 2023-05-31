import fetchLogin from "../lib/axiosLogin";

async function getLogedInUser(host, userToken, userId) {

  if (userId) {
    const usersData = await fetchLogin(host, `users/${userId}`, userToken);
    return usersData;
  }
}

export default getLogedInUser;
