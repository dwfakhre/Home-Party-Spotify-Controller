import mongoose from "mongoose";

const schema = mongoose.Schema;

const VotesSchema = new schema({
  user: {
    type: String,
    required: true,
  },
  room_code: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  song_id: {
    type: String,
    required: true,
  },
});

export const Votes = mongoose.model("votes", VotesSchema);
