import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Room = () => {
  const { code } = useParams();
  const [roomInfo, setroomInfo] = useState({
    code: code,
    name: "",
    guest_can_pause: false,
    votes_to_skip: 1,
    ishost: false,
    spotify_auth: false,
  });

  const getroominfo = () => {
    fetch(
      `http://127.0.0.1:5000/room/current-room/` + roomInfo.code,
      {
        method: "GET",
        body: JSON.stringify(Room),
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => {
      res.json();
      
    }).then((data) => {
      console.log(data);
      setroomInfo({
        name: data.name,
        guest_can_pause: data.guest_can_pause,
        votes_to_skip: data.votes_to_skip,
        ishost: data.ishost,
      });
    });
  };

  useEffect(() => {
    console.log(roomInfo.code)
    getroominfo();
  }, []);

  return (
    <div>
      <h1>Welcome to this Room {roomInfo.codecode}</h1>
      {roomInfo.ishost ? <h1> u are the host </h1> : <h1> welcome again</h1>}
    </div>
  );
};

export default Room;
