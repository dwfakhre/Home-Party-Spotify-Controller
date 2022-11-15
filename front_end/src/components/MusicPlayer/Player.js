import "./Player.css";
import React, { useState, useRef } from "react";
import {
  IoMdPlay,
  IoMdPause,
  IoMdSkipForward,
  IoMdSkipBackward,
} from "react-icons/io";
import axios from "axios";
function Player(props) {
  const [Player, setPlayer] = useState({
    isPlaying: false,
  });

    const Play = async () => {
        await fetch("http://localhost:5000/spotify/play-song", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
    } 
      const Pause = async () => {
        await 
          fetch("http://localhost:5000/spotify/pause-song", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });
    };
    
    const next = async () => {
      await fetch("http://localhost:5000/spotify/next-song", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
    }; 
    const previous = async () => {
      await fetch("http://localhost:5000/spotify/previous-song", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
    }; 
  const progress = (props.time / props.duration) * 100 + "%";

  const style = {
    width: progress,
  };
  
  const dur = {
    min: Math.floor(Math.floor(props.duration / 1000) / 60),
    sec: Math.floor(Math.floor(props.duration / 1000) % 60).toLocaleString(
      "en-US",
      {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }
    ),
  };

  const ti = {
    min: Math.floor(Math.floor(props.time / 1000) / 60),
    sec: Math.floor(Math.floor(props.time / 1000) % 60).toLocaleString(
      "en-US",
      {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }
    ),
  };
  return (
    <div className="player_container">
      <div className="song_image">
        <img src={props.image_url}></img>
      </div>
      <div className="Song_part">
        <div className="Song_infos">
          <div className="song_title">{props.title}</div>
          <div className="song_artists">{props.artist}</div>
        </div>
        <div className="player_section">
          <div className="seeking_section ">
            {ti.min}:{ti.sec}
            <div className="seeking_bar">
              <div className="seeking" style={style}></div>
            </div>
            {dur.min}:{dur.sec}
          </div>
          <div className="controls">
            <IoMdSkipBackward
              className="btn_action"
              size="30px"
              onClick={previous}
            />
            {props.is_playing ? (
              <IoMdPause
                className="btn_action pp"
                size="30px"
                onClick={Pause}
              />
            ) : (
              <IoMdPlay className="btn_action pp" size="30px" onClick={Play} />
            )}
            <IoMdSkipForward
              className="btn_action"
              size="30px"
              onClick={next}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
