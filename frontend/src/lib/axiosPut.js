import axios from "axios";

async function updateData(host, endpoint, obj) {
  console.log(obj)
  const { data } = await axios.put(`${host}${endpoint}`, obj);
  return data;
}

export default updateData;
