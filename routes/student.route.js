const express = require("express");
const jwt = require("jsonwebtoken");

const studentController = require("../controllers/student.controller");
const studentModel = require("../model/students.model");

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

// Manage Student
router.get("/", studentController.students);
router.get("/:id", studentController.studentData);
router.post("/editStudent", studentController.editStudent);

module.exports = router;
