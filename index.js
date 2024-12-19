const express = require("express");
const multer = require("multer");
const morgan = require('morgan');

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
  res.render("registration");
});

app.post("/register", async (req, res, next) => {
  console.log(req.body);
  console.log(req.file);

//   const documentUpload = new studentUploadDocsModel({
//     student_id: student_id,
//     document_id: doc_id,
//     doc_number: document_number,
//     file_path: document.path.slice(6),
//   });
//   await documentUpload.save();
  res.redirect("/");
});

const port = 3000;
app.listen(port);
