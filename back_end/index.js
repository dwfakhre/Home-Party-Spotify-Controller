import express  from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from "cors";
import sessions from "express-session"
import roomRoutes from "./routes/room-path.js"
import welcomeRoutes from "./routes/welcome.js"
import cookieParser from "cookie-parser";
let app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
app.use(cookieParser());

app.use('/', welcomeRoutes)
app.use('/room', roomRoutes);

const Connection_URL = 'mongodb+srv://Walid:walidwalid@cluster0.f1ivs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = 5000;

mongoose.connect(Connection_URL)
    .then(() => app.listen(PORT, () => console.log(`server running on port : ${PORT}`)))
    .catch((error) => console.log(error.message));

