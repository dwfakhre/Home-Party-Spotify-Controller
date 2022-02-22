
import { Image } from './images.js'
import mongoose from 'mongoose';
const schema = mongoose.Schema;


function generate_auto_code() {
    var code = '';
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
        default : generate_auto_code(),
    },
    name: {
        type: String,
        required: true,
        default: 'Random Music',
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
        required: true,
        default: 2
    },
    number_of_participants: {
        type : Number

    },
    background: {
        type: schema.Types.ObjectId, 
        ref: 'Image'
    },
    created_at: {
        type: Date,
        default : Date.now(),
    }
});

export const Room = mongoose.model("room", RoomSchema);
