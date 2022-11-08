import "./join.css";
import { ImSearch } from "react-icons/im";
import React, { useState, useEffect } from "react";
import { join_room } from "../../api/index";
import { useNavigate } from "react-router-dom";

const Joinroom = () => {
  const [roomCode, setroomCode] = useState("");

  const clear = () => {
    setroomCode("");
  };

  let navigate = useNavigate();

  const HandleJoinSubmit = async (e) => {
    e.preventDefault();
    
    fetch(`http://localhost:5000/room/join-room`, {
      method: "POST",
      body: JSON.stringify({ code: roomCode }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then((res) => res.json()).then((data) => {
      console.log(data);
      navigate(`/room/${data.code}`)
    });
    clear();
  };

  return (
    <div className="section__padding">
      <div className="home-items">
        <h1 className="home-title">Join an existing room</h1>
        <form
          autoComplete="off"
          noValidate
          className="join-form"
          onSubmit={HandleJoinSubmit}
        >
          <lable className="join-form-label">
            <input
              type="text"
              name="code"
              value={roomCode}
              onChange={(e) => {
                setroomCode(e.target.value)
              }}
            />
          </lable>
          <button type="submit" className="join-submit">
            <ImSearch />
          </button>
        </form>
        <p></p>
      </div>
    </div>
  );
};

export default Joinroom;
