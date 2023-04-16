const router = require("express").Router();
const nodemailer = require("nodemailer");
router.post("/", async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    port: 465,
    host: "smpt.gmail.com",
    auth: {
      user: "sebastian.pirog.dev@gmail.com",
      pass: process.env.EMAIL,
    },
    tls: {
      // if you have ECONNECTION ERR
      rejectUnauthorized: false,
    },
  });
  console.log(req.body);
  let info = await transporter.sendMail({
    from: req.body.email,
    to: "sloik89@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: req.body.messages, // plain text body
  });
  res.json({ info, msg: "sent" });
});

module.exports = router;
