const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

// Update
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json(updateUser);
    } catch (err) {
      return res.status(401).json(err);
    }
  } else {
    return res.status(401).json("You can update only your account");
  }
});
// delete
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(401).json("user don't match");
      }
      await Post.deleteMany({ username: user.username });

      try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json("user deleted");
      } catch (err) {
        return res.status(401).json(err);
      }
    } catch (err) {}
  } else {
    return res.status(401).json("You can update only your account");
  }
});
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
