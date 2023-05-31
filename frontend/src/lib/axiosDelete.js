import axios from "axios";

async function deleteData(host, endpoint) {
  try {
    const response = await axios.delete(`${host}${endpoint}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default deleteData;
