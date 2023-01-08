const mongoose = require('mongoose'); 
const resultSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    studentId: {
        type: Number,
        required: true
    },
    result: {
        type: String,
        enum: ["PASS", "FAIL", "On Hold", "Didn’t Attempt"],
        required: true
    }
}, {
    timestamps: true
});

const Result = new mongoose.model("Result", resultSchema);
module.exports = Result;