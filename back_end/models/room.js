

import mongoose from 'mongoose';
const schema = mongoose.Schema;


function generate_auto_code() {
    const code = '';
    const k = 8;
    const chars = "ABCDEFJHIGKLMNOPQRSTUVWXYZ0123456789";
    const len = chars.length;
    for (let i = 0; i < k; i++){
        code += chars.charAt(Math.floor(Math.random()*len))
    };
    return code
};

const RoomSchema = new schema({
    code: {
        type : String,
        required : true,
        unique : true,

    },
    host: {
        type: String,
        required: true,
        
    },
    guest_can_pause: {
        type: Boolean,
        required: true,
    },
    votes_to_skip: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default : Date.now(),
    }
});

export const Room = mongoose.model("room", RoomSchema);
