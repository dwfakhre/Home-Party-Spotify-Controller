import { Room } from "../models/room.js";

function generate_auto_code() {
  const k = 8;
  const chars = "ABCDEFJHIGKLMNOPQRSTUVWXYZ0123456789";
  const len = chars.length;
  do {
    var temp_code = "";
    for (let i = 0; i < k; i++) {
      temp_code += chars.charAt(Math.floor(Math.random() * len));
    }
  } while (Room.find({ code: temp_code }) === true);

  return temp_code;
}

export const create_room = async (req, res) => {
  const temp = req.body;

  if (!temp.code) {
    temp["code"] = generate_auto_code();
  }
  temp.host = req.session.id;

  const new_room = new Room(temp);
  try {
    await new_room.save();
    res.status(201).json(new_room);

    var session = req.session;
    session.code = new_room.code;
    console.log(req.session);

    req.session.save();
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const update_room = async (req, res) => {
  const temp = req.body;
  const id = { _id: req.params.id };
  try {
    const new_room = await Room.findOneAndUpdate(id, temp, { new: true });
    res.status(201).json(new_room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const get_rooms = async (req, res) => {
  console.log(req.session.Room);
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const delete_room = async (req, res) => {
  const id = { _id: req.params.id };
  try {
    const message = await Room.findByIdAndDelete(id);
    res.status(200).json({ message: message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const get_room = async (req, res) => {
  const code = req.params.code;
  try {
    const req_room = await Room.findOne({ code: code });
    console.log(req.session);
    const is_host = req_room.host == req.session.id;
    let temp = { ...req_room["_doc"], isHost: is_host };
    res.status(200).json(temp);
  } catch (error) {
    res.status(404).json({ message: "room not found" });
  }
};

export const search_room = async (req, res) => {
  const code = { code: req.params.code };
  try {
    const req_room = Room.findOne((code = code));
    res.status(200).json(req_room);
  } catch (error) {
    res.status(404).json({ message: "room not found" });
  }
};

export const join_room = async (req, res) => {
  const code = req.body;
  console.log("session join");
  try {
    const req_room = await Room.findOneAndUpdate(code, {
      $inc: { number_of_participants: 1 },
    });
    
    var session = req.session;
    session.code = req_room.code;

    console.log(req.session);

    req.session.save();

    res.status(200).json(req_room);
  } catch (error) {
    console.log(req.session.id);
    res.status(404).json({ message: "room not found" });
  }
};
