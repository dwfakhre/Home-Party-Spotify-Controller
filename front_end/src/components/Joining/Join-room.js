import "./join.css";
import {ImSearch} from "react-icons/im"
import React from "react";

const Joinroom = () => {
  return (
    <div className="home-join">

      <h1>Join an existing room</h1>
      <form className="join-form">
        <label className="join-form-label">
          
          <input type="text" name="name" className="join-form-input" />
        </label>
        <button type="submit" className="join-submit" ><ImSearch/></button>
      </form>
    </div>
  );
};

export default Joinroom;
