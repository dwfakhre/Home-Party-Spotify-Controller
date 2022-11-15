import { Token } from "../models/SpotifyTokens.js";
import { Room } from "../models/room.js";
import { Votes } from "../models/votes.js";
import {
  Client_ID,
  Client_Secret,
  Redirect_URI,
} from "../credentials/credentials.js";
import request from "request";
import {
  get_tokens,
  is_authenticated,
  update_or_create_token,
  execute_api_request,
  update_room_song,
  pause_song,
  play_song,
  skip_song,
  previous_song
} from "../utils/utils.js";
import axios from "axios";

export const create_token = async (req, res) => {
  const temp = req.body;

  temp.User = req.session.id;
  console.log(temp);

  const new_token = new Token(temp);
  try {
    await new_token.save();
    res.status(201).json(new_token);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const authenticate_user = async (req, res) => {
  var state = "w7as5ft54fgkl1nl";
  var scope =
    "user-read-playback-state user-modify-playback-state user-read-currently-playing";

  const URL =
    "https://accounts.spotify.com/authorize?" +
    new URLSearchParams({
      response_type: "code",
      client_id: Client_ID,
      scope: scope,
      redirect_uri: Redirect_URI,
      state: state,
    }).toString();
  res.status(200).json({ url: URL });

  console.log("redirected");
};

export const callback = async (req, res) => {
  console.log("u are in callback");
  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/#" +
        new URLSearchParams({
          error: "state_mismatch",
        }).toString()
    );
  } else {
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: Redirect_URI,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(Client_ID + ":" + Client_Secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, async (error, response, body) => {
      const exp = body.expires_in;
      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + exp);

      var temp = {
        User: req.session.id,
        access_token: body.access_token,
        refresh_token: body.refresh_token,
        token_type: body.token_type,
        expires_in: expires,
      };
      const token = await update_or_create_token(temp);

      const room = await Room.findOne({ host: token.User });

      return res.redirect(`http://localhost:3000/room/${room.code}`);
    });
  }
};

export const is_auth = async (req, res) => {
  const auth = await is_authenticated(req.session.id);
  res.status(200).json({ is_auth: auth });
};

export const current_song = async (req, res) => {
  const room_code = req.session.code;
  
  try {
    const req_room = await Room.findOne({ code: room_code });

    const host = req_room.host;

    const data = await execute_api_request(host, "player/currently-playing");
    
    const item = data.item;
    const duration = item.duration_ms;
    const progress = data.progress_ms;
    const album_cover = item.album.images[1].url;
    const is_playing = data.is_playing;
    const song_id = item.id;

    var artists = "";

    for (var artist in item.artists) {
      if (artist > 0) {
        artists += ", ";
      }

      artists += item.artists[artist].name;
    }

    const votes = await (
      await Votes.find({ room_code: req_room.code, song_id: song_id })
    ).length;

    const song = {
      title: item.name,
      artist: artists,
      duration: duration,
      time: progress,
      image_url: album_cover,
      is_playing: is_playing,
      votes: votes,
      votes_required: req_room.votes_to_skip,
      id: song_id,
    };
    await update_room_song(req_room, song_id);
    
    res.status(200).json(song);
  } catch (error) {
    res.status(404).json({ message: "room not found" });
  }
};

export const playsong = async (req, res) => {
  const code = req.session.code;
  console.log(req.session.code);
  try {
    const req_room = await Room.findOne({ code: code });
    const host = req_room.host;
    if (req.session.id === host || req_room.guest_can_pause) {
      await play_song(host);
    } else {
      res.status(403).json({ message: "action not allowed" });
    }
  } catch (error) {
    res.status(404).json({ message: "room not found" });
  }
};

export const pausesong = async (req, res) => {
  const code = req.session.code;

  console.log(req.session.code)
  try {
    const req_room = await Room.findOne({ code: code });
    
    const host = req_room.host;
    
    if (req.session.id === host || req_room.guest_can_pause) {
      await pause_song(host);
      
    } else {
      res.status(403).json({ message: "action not allowed" });
    }
  } catch (error) {
    res.status(404).json({ message: "room not found" });
  }
};

export const skipsong = async (req, res) => {
  const code = req.session.code;
  console.log(req.session.code);
  try {
    const req_room = await Room.findOne({ code: code });
    
    const votes = await (
      await Votes.find({ code: req_room.code, song_id: req_room.current_song })
    ).length;
    const host = req_room.host;
    if (req.session.id === host || votes + 1 >= req_room.votes_to_skip) {
      await skip_song(host);
    } else {
      res.status(403).json({ message: "action not allowed" });
    }
  } catch (error) {
    res.status(404).json({ message: "room not found" });
  }
};

export const previoussong = async (req, res) => {
  const code = req.session.code;
  try {
    const req_room = await Room.findOne({ code: code });
    const votes = await (
      await Votes.find({ code: req_room.code, song_id: req_room.current_song })
    ).length;
    const host = req_room.host;
    if (req.session.id === host || votes + 1 >= req_room.votes_to_skip) {
      await previous_song(host);
    } else {
      res.status(403).json({ message: "action not allowed" });
    }
  } catch (error) {
    res.status(404).json({ message: "room not found" });
  }
};
