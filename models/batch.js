import { Schema, model } from 'mongoose'; 
const batchSchema = new Schema({
    batch: {
        type: String,
        required: true,
        unique: true
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ]
}, {
    timestamps: true
});

const Batch = new model("Batch", batchSchema);
export default Batch;