const studentModel = require("../model/students.model");

// Manage Students
async function students(req, res, next) {
  const students = await studentModel.find({
    username: { $ne: "admin" },
    isActive: true,
  });
  console.log(req.cookies);
  console.log(req.cookies.auth);
  
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
    let photo;
  if(req.file)  photo = req.file;

  const student = await studentModel.findOne({ _id: id });

  student.name = name;
  student.dob = dob;
  student.email = email;
  student.mobile = mobile;

  student.gender = gender;
  student.address = address;
  student.hobbies = hobby;
  student.academic_year = academicYear;
  if(photo && photo.path){ student.photo_path = photo.path.slice(6);}

  await student.save();
  req.session.sweetalert = { title: "Student Edited", icon: "success" };

  res.redirect("/student/");
}

async function deleteStudent(req, res, next) {
  const { deleteId } = req.body;
  const student = await studentModel.findOne({ _id: deleteId });
  student.isActive = false;

  await student.save();

  res.json({ success: true });
}

module.exports = { students, studentData, editStudent, deleteStudent };
