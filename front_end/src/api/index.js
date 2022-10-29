import axios from "axios";

const url = "http://localhost:5000/room";

export const join_room = (roomcode) => {
  axios.post(`${url}/join-room`, { code: roomcode });
};

export const create_room = async (room, navigate) => {
  const res = await axios
    .post(`${url}/create-room`, room, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }).then(res => res.data);
  console.log(res)
  return res;
  
};

export const room_infos = async (code) => {
  try {
    const res = await axios
      .get(`${url}/current-room/${code}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => res.data);
    return res;
  } catch (error) {
    
  }
}
