import axios from "axios";

const url = "192.168.137.1:5000/room";

export const join_room = (roomcode) => { axios.post(`${url}/join-room`, {"code" : roomcode})}