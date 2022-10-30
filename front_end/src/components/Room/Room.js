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
    spotifyauth: false,
    song: {},
  });

  const { code } = useParams();

  useEffect(() => {
    get_room_infos(code);
  }, [code]);

  const get_room_infos = async () => {

    const res = await room_infos(code);
    
    setRoom({
      room_code: res.code,
      name: res.name,
      votes: res.votes_to_skip,
      isHost: res.isHost,
      host: res.host,
      guest_can_pause: res.guest_can_pause,
    });
    auth_spotify();
  };

  const auth_spotify = async () => {
    await fetch("http://localhost:5000/spotify/is-auth", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then((res) => res.json())
      .then((res) => {
        setRoom({ ...Room, spotifyauth: res.is_auth });
        console.log(res.is_auth);
        if (!res.is_auth) {
          fetch("http://localhost:5000/spotify/authen", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            "Access-Control-Allow-Origin": "http://localhost:3000",
            credentials: "include"
          });
        }
      });
  };
  return (
    <h1>
      Welcome to this Room {Room.name} {Room.host}
    </h1>
  );
}
