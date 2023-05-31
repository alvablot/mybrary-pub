
import axios from "axios";

async function fetchData(host, endpoint) {
  const response = await axios.get(`${host}${endpoint}`);
  const data = response.data;
  return data;
}

export default fetchData;