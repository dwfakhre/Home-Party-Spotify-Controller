import { get_room } from "../controllers/room_controllers.js";
import { Token } from "../models/SpotifyTokens.js";
import axios from "Axios";
import {
  Client_ID,
  Client_Secret,
  Redirect_URI,
} from "../credentials/credentials.js";
import request from "request";
const BASE_URL = "https://api.spotify.com/v1/me/";
export var get_tokens = async (session_id) => {
  try {
    const tokens = await Token.findOne({ User: session_id });
    return tokens;
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const update_or_create_token = async (temp) => {
  const token = await get_tokens(temp.User);
  console.log(token);
  if (!token) {
    const new_token = new Token(temp);

    try {
      await new_token.save();

      return new_token;
    } catch (error) {
      console.log(error);
    }
  } else {
    const id = { _id: token.id };
    try {
      const new_token = await Token.findOneAndUpdate(id, temp, { new: true });
      console.log(new_token);
      return new_token;
    } catch (error) {
      console.log({ message: error.message });
    }
  }
};

export var is_authenticated = async (session_id) => {
  const token = await get_tokens(session_id);

  if (token) {
    const date = new Date();

    const refresh = token.refresh_token;
    if (token.expires_in <= date) {
      const token = await refresh_token(refresh, session_id);
      return true;
    } else {
      return true;
    }
  }
  return false;
};

export const refresh_token = async (refresh_token, session_id) => {
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(Client_ID + ":" + Client_Secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, async (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const exp = body.expires_in;
      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + exp);
      var temp = {
        User: session_id,
        access_token: body.access_token,
        refresh_token: refresh_token,
        token_type: body.token_type,
        expires_in: expires,
      };
      const token = await update_or_create_token(temp);
      return token;
    }
  });
};

export const execute_api_request = async (
  sessions_id,
  endpoint,
  post_ = false,
  put_ = false
) => {
  const token = await get_tokens(sessions_id);
  
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token.access_token,
  };
  
  const url = BASE_URL + endpoint;
  
  if (post_) {
    await axios.post(url, {
      headers: headers,
    });
  }

  if (put_) {
    console.log(url);
    await axios.put(url, {
      headers: headers,
    });
  }

  const res = await axios
    .get(url, {
      headers: headers,
    })
    .then((res) => res.data);

  

  try {
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const play_song = async (session_id) => {
  return await execute_api_request(session_id, "player/play", (put_ = true));
};

export const pause_song = async (session_id) => {
  const token = await get_tokens(session_id);
  
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token.access_token,
  };
  console.log(headers);
  const url = BASE_URL + "player/pause";
  const res = await fetch("https://api.spotify.com/v1/me/player/pause", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    Authorization: "Bearer " + token.access_token,
  });
  
  console.log(res)

  const res1 = await axios
    .get(url, {
      headers: headers,
    })
    .then((res1) => res1.data);

  try {
    return res1;
  } catch (error) {
    console.log(error);
  }

  
};

export const skip_song = async (session_id) => {
  return await execute_api_request(session_id, "player/next", (post_ = true));
};

export const previous_song = async (session_id) => {
  return await execute_api_request(
    session_id,
    "player/previous",
    (post_ = true)
  );
};

export const update_room_song = async (room, song) => {
  const current_song = room.current_song;
  if (current_song != song) {
    const new_one = { current_song: song };
    const url = "http://localhost:5000/room/update-room/" + room._id;
    const res = await axios.patch(url, new_one).then((res) => res.data);
  }
};
