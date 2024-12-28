const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    username: { type: String },
    password: { type: String },

    name: { type: String, required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },

    gender: { type: String, enum: ['MALE','FEMALE'], required: true },
    address: { type: String, required: true },
    hobbies: [String],
    academic_year: { type: String, required: true },
    photo_path: { type: String, required: true },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const studentModel = mongoose.model("students", studentSchema);
module.exports = studentModel;
