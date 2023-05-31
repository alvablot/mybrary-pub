import axios from "axios";

async function patchData(host, endpoint, obj) {
  const { data } = await axios.patch(`${host}${endpoint}`, obj);
  return data;
}

export default patchData;
