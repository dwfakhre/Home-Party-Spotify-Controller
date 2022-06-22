
import "bootstrap/dist/css/bootstrap.min.css";


import "./home.css"
import "../App.css"
import React from "react";
import {Link} from "react-router-dom"



function homePage() {
  return (
    <div className=" section__padding home-items">
      <h1 className="home-title">WELCOME PARTY LOVER</h1>

      <div className="home-buttons">
        <Link to="/join">
          <button className="home-button-join">Join a Party</button>
        </Link>
        <Link to="/create">
          <button className="home-create">Create a Room</button>
        </Link>
      </div>
    </div>
  );
}

export default homePage;
