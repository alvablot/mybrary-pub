import axios from "axios";

async function postData(host, endpoint, obj) {
  const { data } = await axios.post(`${host}${endpoint}`, obj);
  return data;
}

export default postData;
