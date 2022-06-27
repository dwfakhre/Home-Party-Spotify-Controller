import mongoose from "mongoose";
const schema = mongoose.Schema;

const TokensSchema = new schema({
  User: {
    type: String,
    required: true,
    unique: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  refresh_token: {
    type: String,
    required: true,
  },
  access_token: {
    type: String,
    required: true,
  },
  expires_in: {
    type: Date,
  },
  token_type: {
    type: String,
    required: true,
  },
});

export const Token = mongoose.model("Token", TokensSchema);
