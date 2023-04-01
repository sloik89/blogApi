const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// create
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (err) {
    res.status(500).json(err);
  }
});
// update
router.put("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        return res.status(200).json(updatedPost);
      } catch (err) {
        return res.status(401).json(err);
      }
    } else {
      return res.status(401).json("you can update your post");
    }
  } catch (err) {
    res.status(500).json({ msg: "something wrong ", error: err });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.deleteOne();
        console.log(post);
        return res.status(200).json("post has been deleted");
      } catch (err) {
        return res.status(500).json({ err, msg: "xxx" });
      }
    } else {
      return res.status(401).json("you can delete your post");
    }
  } catch (err) {
    return res
      .status(500)
      .json({ err, msg: "post already deleted or can't found" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(401).json("Post can't find");
  }
});
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;

  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(401).json("Post can't find");
  }
});
module.exports = router;
