import { Token } from "../models/SpotifyTokens.js";
import { Room } from "../models/room.js";
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

  await res.redirect(
    "https://accounts.spotify.com/authorize?" +
      new URLSearchParams({
        response_type: "code",
        client_id: Client_ID,
        scope: scope,
        redirect_uri: Redirect_URI,
        state: state,
      }).toString()
  );
  console.log("redirected");
};

export const callback = async (req, res) => {
  console.log("u are in callback");
  var code = req.query.code || null;
  var state = req.query.state || null;
  console.log(state);
  if (state === null) {
    res.redirect(
      "/#" +
        new URLSearchParams({
          error: "state_mismatch",
        }).toString()
    );
  } else {
    //7e8a0c50-57ef-11ed-a7da-b1792d2e47b5
    console.log(req.session.id);
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
        cred,
      },
      json: true,
    };
    /*  const res = await axios
      .post("https://accounts.spotify.com/api/token", {
        code: code,
        redirect_uri: Redirect_URI,
        grant_type: "authorization_code",
      }, {
        headers: {
          Authorization:
            "Basic " +
            new Buffer(Client_ID + ":" + Client_Secret).toString("base64"),
        },
        withCredentials: true
        
      }, )
      .then((res) => res.data); 
    console.log(res)*/
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
      console.log("token");
      console.log(token);
      const room = await Room.findOne((host = token.User));
      return res.redirect(`http://127.0.0.1:3000/room/${room.code}`);
    });
  }
};

export const is_auth = async (req, res) => {
  const auth = await is_authenticated(req.session.id);
  res.status(200).json({ is_auth: auth });
};
