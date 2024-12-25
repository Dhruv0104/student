const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const studentController = require("../controllers/student.controller");

const studentModel = require("../model/students.model");

const { asyncRouteHandler } = require('../utils/route.util');

const router = express.Router();

router.use(authMiddleware());
router.use(dataMiddleware);

async function dataMiddleware(req, res, next) {
  const userData = await studentModel.findOne({ _id: res.locals.userData._id });
  res.locals.user = userData;
  return next();
}

function authMiddleware() {
  return async function (req, res, next) {
    if (!req.cookies || !req.cookies.auth) {
      return res.redirect("/logout");
    }

    const auth = req.cookies.auth;
    try {
      const userData = jwt.verify(auth, process.env.JWT_SECRET);
      res.locals.userData = userData;
      return next();
    } catch (e) {
      console.log(e);
      res.clearCookie("auth");
      return res.redirect("/logout");
    }
  };
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, './uploads/studentDocuments');
    const destinationPath = "./public/uploads/studentsPhoto";
    fs.mkdir(destinationPath, { recursive: true }, (err) => {
      if (err) {
        return cb(err);
      }
      cb(null, destinationPath);
    });
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    cb(null, `${Date.now()}${fileExtension}`);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});
const upload = multer({ storage: storage });

// Manage Student
router.get("/", asyncRouteHandler(studentController.students));
router.get("/:id", asyncRouteHandler(studentController.studentData));
if(upload.single("photo")){
  router.post("/editStudent",upload.single("photo"), asyncRouteHandler(studentController.editStudent));
}else{
  router.post("/editStudent", asyncRouteHandler(studentController.editStudent));
}
router.post("/delete", asyncRouteHandler(studentController.deleteStudent));

module.exports = router;
