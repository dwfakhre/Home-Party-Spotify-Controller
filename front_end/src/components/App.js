import * as style from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./structure/navbar";
import Home from "./Home/home";
import Toprooms from "./TopRooms/toprooms";
import Createroom from "./Creation/Createroom"
import React from "react";


function App() {
  return (
    <div className="app_container">
      <Navbar />
      <Home />

    </div>
  );
}

export default App;
