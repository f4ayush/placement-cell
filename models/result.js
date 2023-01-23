const mongoose = require('mongoose'); 
const resultSchema = new mongoose.Schema({
    interviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview',
        required: true
    },
    result: {
        type: String,
        enum: ["pass", "fail", "on_hold", "didnt_attempt"],
        default: "didnt_attempt"
    }
}, {
    timestamps: true
});

const Result = new mongoose.model("Result", resultSchema);
module.exports = Result;