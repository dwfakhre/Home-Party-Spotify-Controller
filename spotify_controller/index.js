import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import sessions from "express-session";
import roomRoutes from "./routes/room-path.js";
import welcomeRoutes from "./routes/welcome.js";
import cookieParser from "cookie-parser";
import crypto from "crypto";
import uuid from "node-uuid";
let app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    genid: function (req) {
      return uuid.v1();
    },
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
    room_code: "one",
  })
);

app.use(cookieParser());

app.use("/", welcomeRoutes);
app.use("/spotify", SpotifyRoutes);
