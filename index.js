const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/post");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const app = express();
app.use(express.json());
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("connected"))
  .catch((err) => console.log(err));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, "hello.jpg");
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file upload");
});
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/category", categoryRoute);

app.listen("5000", () => {
  console.log(`backed is runing `);
});
