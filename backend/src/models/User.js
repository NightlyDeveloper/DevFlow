import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
    },
    role: {
        type: String,
        enum: ["admin", "developer"],
        default: "developer"
    },
}, {
    timestamps: true
});

export default mongoose.model("User", UserSchema);