import express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";



const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const Connection_URL = 'mongodb+srv://Walid:walidwalid@cluster0.f1ivs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = 5000;

mongoose.connect(Connection_URL)
    .then(() => app.listen(PORT, () => console.log(`server running on port : ${PORT}`)))
    .catch((error) => console.log(error.message));

