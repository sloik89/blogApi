const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
// register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassord = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassord,
    });
    const user = await newUser.save();
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json("Wrong Credentail");
    }

    const validate = await bcrypt.compare(req.body.password, user.password);

    if (!validate) {
      return res.status(400).json("WRong credentail");
    }
    const { password, ...rest } = user._doc;
    return res.status(200).json(rest);
  } catch (err) {
    return res.status(500).json(err);
  }
});
module.exports = router;
