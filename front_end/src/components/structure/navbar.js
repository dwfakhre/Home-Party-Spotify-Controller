
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';
import logo from '../../images/logo.png';
import React from "react";

function navbar() {
    return (
      <div className="navbar-container">
        <img src={logo} alt="logo" className="navbar-img"></img>
        <div className="navbar-items">
          <div className='room-name'><a href='#' className="navbar-code">Room Code</a></div>
          <div className='navbar-buttons'>
            <button className="navbar-login">Log In</button>
            <button className="navbar-signup">Sign Up</button>
          </div>
        </div>
      </div>
    );
}
export default navbar;