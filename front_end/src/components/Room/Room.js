import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { room_infos } from "../../api";

export default function Room() {
  const [Room, setRoom] = useState({
    room_code: "",
    name: "",
    isHost: false,
    guest_can_pause: false,
    host: "",
    votes: 2,
  });

  const { code } = useParams();

  useEffect(() => {
    get_room_infos(code);
  }, [code]);

  const get_room_infos = async () => {
    
    console.log();
    const res = await room_infos(code);
    console.log(res);
    setRoom({
      room_code: res.code,
      name: res.name,
      votes: res.votes_to_skip,
      isHost: res.isHost,
      host: res.host,
      guest_can_pause: res.guest_can_pause,
    });
  };

  return (
    <h1>
      Welcome to this Room {Room.name} {Room.host}
    </h1>
    
  );
}
