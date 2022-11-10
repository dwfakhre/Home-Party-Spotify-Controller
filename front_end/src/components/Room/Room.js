import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { room_infos } from "../../api";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  useEffect(() => {
    get_room_infos(code);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      get_current_song();
    }, 500);
    return () => clearInterval(interval);
  }, [Room]);

  const get_room_infos = async () => {
    const res = await room_infos(code);
    setRoom({
      ...Room,
      room_code: code,
      name: res.name,
      votes: res.votes_to_skip,
      isHost: res.isHost,
      host: res.host,
      guest_can_pause: res.guest_can_pause,
    });

    if (res.isHost) {
      auth_spotify();
    }
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
        if (!res.is_auth) {
          fetch("http://localhost:5000/spotify/authen", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          })
            .then((res) => res.json())
            .then((data) => {
              navigate(data.url);
            });
        }
      });
  };

  const get_current_song = async () => {
    await fetch("http://localhost:5000/spotify/current-song", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setRoom({ ...Room, song: data });
      });
  };

  return (
    <div>
      <h1>Welcome to this Room {Room.song.title}</h1>
      <img src={Room.song.image_url}></img>
    </div>
  );
}
