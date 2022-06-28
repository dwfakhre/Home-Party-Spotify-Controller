import { Token } from "../models/SpotifyTokens.js";
import { Room } from "../models/room.js";
import {
  Client_ID,
  Client_Secret,
  Redirect_URI,
} from "../credentials/credentials.js";
import request from "request";
import { get_tokens, is_authenticated, update_or_create_token } from "../utils/utils.js";

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
  var state = generateRandomString(16);
  var scope =
    "user-read-playback-state user-modify-playback-state user-read-currently-playing";

  await res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: Client_ID,
        scope: scope,
        redirect_uri: Redirect_URI,
        state: state,
      })
  );
};

export const callback = async (req, res) => {
  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
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
        const room = await Room.findOne(host = token.User)
        return res.redirect(`http://127.0.0.1:3000/room/${room.code}`)
    });
    }
    
};

export const is_auth = async (req, res) => {
    const auth = is_authenticated(req.session.id);
    res.status(200).json({is_auth : auth})

}
