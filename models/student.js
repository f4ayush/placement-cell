const mongoose = require('mongoose'); 
const studentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    interviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Interview'
        }
    ],
    status: {
        type: String,
        enum: ["placed", "not_placed"],
        required: true
    },
    batch:{
        type: String,
        required: true
    },dsa: {
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

const Student = new mongoose.model("Student", studentSchema);

module.exports = Student;