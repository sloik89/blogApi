const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const path = require("path");
const app = express();
app.use(express.json());
dotenv.config();
console.log(__dirname);
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.listen("5000", () => {
  console.log(`backed is runing `);
});
