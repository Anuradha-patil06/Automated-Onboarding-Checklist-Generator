const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const checklistSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            required: true
        },
        department: {
            type: String,
            required: true
        },
        tasks: {
            type: [taskSchema],
            default: []
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Checklist", checklistSchema);