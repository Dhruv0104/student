const studentModel = require("../model/students.model");

// Manage Students
async function students(req, res, next) {
  const students = await studentModel.find({ username: { $ne: "admin" } });
  res.render("manage-student",{students: students});
}

module.exports = { students };
