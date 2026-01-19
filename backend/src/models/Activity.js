import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    project: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
}, {timestamps: true})

export default mongoose.model("Activity", ActivitySchema)