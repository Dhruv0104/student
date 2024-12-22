const studentModel = require("../model/students.model");

// Manage Students
async function students(req, res, next) {
  const students = await studentModel.find({ username: { $ne: "admin" } });
  res.render("manage-student", { students: students });
}

async function studentData(req, res, next) {
  const id = req.params.id;
  const student = await studentModel.findOne({ _id: id });
  res.send(student);
}

async function editStudent(req, res, next) {
  const { id, name, dob, email, mobile, gender, address, hobby, academicYear } =
    req.body;

  const student = await studentModel.findOne({ _id: id });

  student.name = name;
  student.dob = dob;
  student.email = email;
  student.mobile = mobile;

  student.gender = gender;
  student.address = address;
  student.hobbies = hobby;
  student.academic_year = academicYear;

  await student.save();

  res.redirect("/student/");
}

module.exports = { students, studentData, editStudent };
