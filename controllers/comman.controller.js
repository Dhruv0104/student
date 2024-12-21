const jwt = require("jsonwebtoken");

const studentModel = require("../model/students.model");

// **********Login***************
async function loginPage(req, res, next) {
  res.clearCookie("auth");
  return res.render("login");
}
async function login(req, res, next) {
  const { username, password } = req.body;

  let user = await studentModel.findOne({
    username: username,
    password: password,
    isActive: true,
  });

  if (!user) {
    return res.redirect("/login");
  }

  let token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("auth", token);
  res.redirect("/student");
}
async function logout(req, res, next) {
  res.clearCookie("auth");
  return res.redirect("/login");
}
// **********Login***************

// **********Registration***************
async function registrationPage(req, res, next) {
  return res.render("registration");
}
async function register(req, res, next) {
  const { name, dob, email, mobile, gender, address, hobby, academicYear } =
    req.body;
  const photo = req.file;

  const username = await Username();
  const password = randomPassword();

  const student = new studentModel({
    username: username,
    password: password,

    name: name,
    dob: dob,
    email: email,
    mobile: mobile,

    gender: gender,
    address: address,
    hobbies: hobby,
    academic_year: academicYear,
    photo_path: photo.path,
    // file_path: document.path.slice(6),
  });
  await student.save();

  res.redirect("/");
}
async function Username() {
  const count = await studentModel.countDocuments({});
  var username = "VGEC_" + count;
  return username;
}
function randomPassword() {
  let characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let pass = "";
  for (let i = 0; i < 8; i++) {
    pass += characters[Math.floor(Math.random() * characters.length)];
  }
  return pass;
}
// **********Registration***************

module.exports = { loginPage, login, registrationPage, register, logout };
