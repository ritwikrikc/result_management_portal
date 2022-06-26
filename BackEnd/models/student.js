const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
    roll_no: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    total_marks: {
        type: Number,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    result_status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("students", StudentSchema);