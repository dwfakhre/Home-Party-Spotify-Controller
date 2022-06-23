import * as styles from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Createroom.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function Create() {
  const [Room, setRoom] = useState({
    code: "",
    name: "",
    guest_can_pause: false,
    votes_to_skip: 1,
  });

  const generate_auto_code = () => {
    var code = "";
    const k = 8;
    const chars = "ABCDEFJHIGKLMNOPQRSTUVWXYZ0123456789";
    const len = chars.length;
    for (let i = 0; i < k; i++) {
      code += chars.charAt(Math.floor(Math.random() * len));
    }
    return code;
  };

  const navigate = useNavigate();

  const handleCreateSubmit = (e) => {
    e.preventDefault();

    fetch(`http://192.168.137.1:5000/room/create-room`, {
      method: "POST",
      body: JSON.stringify(Room ),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json()).then(navigate(`/room/${Room.code}`));

    clear();

  }

  const clear = () => {
    setRoom({
      code: null,
      name: "",
      guest_can_pause: false,
      votes_to_skip: 1,
    });
  }


  return (
    <div className="section__padding">
      <div className="home-items">
        <h1 className="home-title">create a new room</h1>
        <form className="form" onSubmit={handleCreateSubmit}>
          <div className="form-item">
            <label for="roomcode" className="label left">
              Code
            </label>
            <input
              type="text"
              id="roomcode"
              value={Room.code}
              className="right"
              placeholder="Code"
              onChange={(e) => {
                setRoom({ ...Room, code: e.target.value });
              }}
            />
          </div>
          <div className="form-item">
            <label for="roomname" className="label left">
              Name
            </label>
            <input
              type="text"
              className="right"
              value={Room.name}
              id="roomname"
              placeholder="Name"
              onChange={(e) => {
                setRoom({ ...Room, name: e.target.value });
              }}
            />
          </div>
          <div className="form-item">
            <label className="label left">Guests pause?</label>
            <input
              className="check right"
              type="checkbox"
              value={Room.guest_can_pause}
              onChange={(e) => {
                setRoom({ ...Room, guest_can_pause: e.target.checked });
              }}
            />
          </div>
          <div className="form-item">
            <label for="votestoskip" className="label left">
              Votes to skip
            </label>
            <input
              type="number"
              className="right"
              id="votestoskip"
              value={Room.votes_to_skip}
              onChange={(e) => {
                setRoom({ ...Room, votes_to_skip: e.target.value });
              }}
            />
          </div>

          <button type="submit" className="form-item">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
