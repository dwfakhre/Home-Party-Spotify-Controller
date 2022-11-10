import express, { Router } from "express";
import { create_token, authenticate_user, is_auth, callback, current_song } from "../controllers/spotify_controllers.js";

const router = express.Router();

router.post("/create-token", create_token);
router.get("/authen", authenticate_user);
router.get("/is-auth", is_auth);
router.get("/redirect", callback);
router.get("/current-song", current_song )


export default router;