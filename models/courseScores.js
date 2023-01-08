const mongoose = require('mongoose'); 
const courseScoresSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    batch:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dsa: {
        type: Number,
        required: true
    },
    webDevelopment: {
        type: Number,
        required: true
    },
    react: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const CourseScores = new mongoose.model("CourseScores", courseScoresSchema);
module.exports = CourseScores;