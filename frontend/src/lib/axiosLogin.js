import axios from "axios";

async function fetchLogin(host, endpoint, token) {
  if (!token) return;
  try {
    const response = await axios.get(`${host}${endpoint}`, {
      headers: { Authorization: "Bearer " + token },
    });
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default fetchLogin;
