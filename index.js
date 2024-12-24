require("dotenv").config();
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const { dbConnect } = require("./utils/db.util");
const { errorHandler, asyncRouteHandler } = require("./utils/route.util");

// Routes
const studentRoutes = require("./routes/student.route");
const commanRoutes = require("./routes/common.route");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

app.set("view engine", "ejs");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
app.use("", commanRoutes);
app.use("/student", studentRoutes);

app.use(errorHandler);

dbConnect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("http://localhost:3000/");
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("DB ERROR");
  });
