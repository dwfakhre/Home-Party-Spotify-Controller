import express, { Router } from "express";
import { Token } from "../models/SpotifyTokens.js";

const router = express.Router();

router.post("/token", async (req, res) => {
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
} );


export default router;