const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dfex9btyq",
  api_key: "663675842776214",
  api_secret: "gix2jf3fXSynStORa_JYg9DQ_fk",
});
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/post");
const categoryRoute = require("./routes/categories");
const emailRoute = require("./routes/email");
const path = require("path");
const app = express();
// app.use(express.static("./public"));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("connected"))
  .catch((err) => console.log(err));

app.post("/api/upload", async (req, res) => {
  const result = await cloudinary.uploader.upload(req.files.file.tempFilePath, {
    use_filename: true,
    folder: "blogapp",
  });
  console.log(result);
  res.json({ url: result.secure_url });
});
app.post("/api/localupload", async (req, res) => {
  const result = await cloudinary.uploader.upload(req.files.file.tempFilePath, {
    use_filename: true,
    folder: "blogapp",
  });
  console.log(result);
  res.json({ url: result.secure_url });
});
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/category", categoryRoute);
app.use("/api/email", emailRoute);

app.listen("5000", () => {
  console.log(`backed is runing `);
});
