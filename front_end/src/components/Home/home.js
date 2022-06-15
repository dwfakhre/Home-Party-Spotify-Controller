import * as style from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Toprooms from "../TopRooms/toprooms";
import Createroom from "../Creation/Createroom"
import Joinroom from "../Joining/Join-room";
import "./home.css"
import "../App.css"
import React from "react";



function homePage() {
  return (
    <div className="home-container app__wrapper section__padding">
      <div className="home-items">
        <h1 className="home-title">WELCOME PARTY LOVER</h1>

        <div className="home-buttons">
          <button className="home-button-join">Join a Party</button>
          <button className="home-create">Create a Room</button>
        </div>
        <Joinroom />
      </div>
    </div>
  );
}

export default homePage;
