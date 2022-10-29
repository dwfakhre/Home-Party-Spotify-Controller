import React, { useState, useEffect } from "react";
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
    return <h1>Welcome to this Room { code }</h1>;
};

  return (
    <h1>
      Welcome to this Room {Room.name} {Room.host}
    </h1>
    
  );
}
