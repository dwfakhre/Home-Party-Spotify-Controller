import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { room_infos } from "../../api";
import axios from "axios";

export default function Room() {
  const [Room, setRoom] = useState({
    room_code: "",
    name: "",
    isHost: false,
    guest_can_pause: false,
    host: "",
    votes: 2,

    song: {},
  });

  const { code } = useParams();

  useEffect(async () => {
    const res = await get_room_infos(code);
    console.log(res);
    setRoom({
      ...Room,
      room_code: code,
      name: res.name,
      votes: res.votes_to_skip,
      isHost: res.isHost,
      host: res.host,
      guest_can_pause: res.guest_can_pause,
    });
    console.log(Room);
    if (res.isHost) {
      auth_spotify();
    }
    console.log(Room);
  }, []);

  const get_room_infos = async () => {
    const res = await room_infos(code);

    return res;
  };

  const auth_spotify = async () => {
    await fetch("http://localhost:5000/spotify/is-auth", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        /*  setRoom({ ...Room, spotifyauth: res.is_auth }); */
        console.log(res.is_auth);
        if (!res.is_auth) {
          fetch("http://localhost:5000/spotify/authen", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data.url);
              window.location.replace(data.url);
            });
        }
      });
  };
  return <h1>Welcome to this Room {Room.name}</h1>;
}
