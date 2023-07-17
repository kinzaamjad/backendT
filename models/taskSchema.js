import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        require: true
    },
    activity: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    startTime: {
        type: String,
        require: true
    },
    endTime: {
        type: String,
        require: true
    },
},
    { timestamps: true }
)

export default mongoose.model('task', taskSchema)