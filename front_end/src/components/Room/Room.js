import React from "react";
import { useParams } from "react-router-dom";
const Room = () => {
  const { code } = useParams();
    return <h1>Welcome to this Room { code }</h1>;
};

export default Room;
