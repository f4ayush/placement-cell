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
    status: {
        type: String,
        enum: ["placed", "not_placed"],
        required: true
    },
}, {
    timestamps: true
});

const Student = new mongoose.model("Student", studentSchema);
module.exports = Student;