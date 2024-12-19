const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    username: { type: String },
    password: { type: String },

    name: { type: String },
    dob: { type: Date },
    email: { type: String },
    mobile: { type: String },

    gender: { type: String },
    address: { type: String },
    hobbies: { type: String },
    academic_year: { type: String },
    photo_path: { type: String },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const studentModel = mongoose.model("students", studentSchema);
module.exports = studentModel;
