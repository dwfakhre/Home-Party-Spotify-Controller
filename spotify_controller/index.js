import express from "express";
import bodyParser from "body-parser";

import cors from "cors";
import SpotifyRoutes from "./routes/Spotify.js";
import welcomeRoutes from "./routes/welcome.js";
import cookieParser from "cookie-parser";

let app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//session middleware

app.use(cookieParser());

app.use("/", welcomeRoutes);
app.use("/spotify", SpotifyRoutes);

const PORT = 8000;

app.listen(PORT, () => console.log(`server running on port : ${PORT}`));
