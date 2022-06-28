import express, { Router } from "express";
import {create_room, get_room, update_room, delete_room, get_rooms, join_room} from "../controllers/room_controllers.js"

const router = express.Router();

router.get('/all-rooms', get_rooms);

router.get('/current-room/:id', get_room);

router.get('/join-room', join_room);

router.post('/create-room', create_room);

router.patch('/update-room/:id', update_room);

router.delete('/delete-room/:id', delete_room)

export default router;