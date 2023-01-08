const mongoose = require('mongoose'); 
const interviewSchema = new mongoose.Schema({
    batch:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Batch'
    },
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    company: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

const Interview = new mongoose.model("Interview", interviewSchema);
module.exports = Interview;