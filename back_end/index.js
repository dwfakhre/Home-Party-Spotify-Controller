import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import sessions from "express-session";
import roomRoutes from "./routes/room-path.js";
import welcomeRoutes from "./routes/welcome.js";
import SpotifyRoutes from "./routes/Spotify.js";
import cookieParser from "cookie-parser";
import crypto from "crypto";
import uuid from "node-uuid";
import MongoStore from "connect-mongo";
let app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.set("trust proxy", 1);
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

const oneDay = 1000 * 60 * 60 * 24;
// ab229630-5626-11ed-8024-f1996196cc13
//session middleware
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    name: "test",
    genid: function (req) {
      return uuid.v1();
    },
    saveUninitialized: true,
    cookie: {
      maxAge: oneDay,

      secure: false,
    },
    resave: false,

    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://Walid:walidwalid@cluster0.f1ivs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      collectionName: "sessions",
    }),
  })
);

//routes
app.use("/", welcomeRoutes);
app.use("/room", roomRoutes);
app.use("/spotify", SpotifyRoutes);

//database connection
const Connection_URL =
  "mongodb+srv://Walid:walidwalid@cluster0.f1ivs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = 5000;

mongoose
  .connect(Connection_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port : ${PORT}`))
  )
  .catch((error) => console.log(error.message));
