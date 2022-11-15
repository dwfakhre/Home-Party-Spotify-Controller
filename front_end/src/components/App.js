import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./Home/home.css";

import Home from "./Home/home";
import Joinroom from "./Joining/Join-room";
import Createroom from "./Creation/Createroom";
import Room from "./Room/Room";
import React from "react";

function App() {
  return (
    <Router>
      
      <div className="app__wrapper app_container home-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<Joinroom />} />
          <Route path="/create" element={<Createroom />} />
          <Route path="/room/:code" element={<Room />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
