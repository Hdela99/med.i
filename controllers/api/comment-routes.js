const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth"); //-------- Don't forget to add authentication -----------

//GET all Comment
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET one Comment
router.get("/:id", async (req, res) => {
  try {
    //the comment that is received should be linked the medication that the comment refers to......how do I do that?
    const commentData = await Comment.findByPk(req.params.id);
    if (!commentData) {
      res.status(400).json({ message: "No comment found with that id!" });
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//POST route Comment
router.post("/", async (req, res) => {
  try {
    const commentData = await Comment.Create(req.body.comment, {
      where: {
        user_id: req.session.user_id,
      },
    });
    res
      .status(200)
      .json(commentData, { message: "Successfully created comment!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//PUT route Comment
router.put("/:id", async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!commentData[0]) {
      res.status(404).json({
        message: "No comment found with this id!",
      });
      return;
    }
    res.status(200).json({ message: "Successfully updated comment!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE route Comment
router.delete("/:id", async (req, res) => {
  //this makes sure the User deleting the comment is the User that created it
  const comment = await Comment.findByPk(req.params.id);

  if (req.session.userID !== comment.user_id) {
    res.status(403).json({
      message: "you cannot delete that comment beacuse it is not yours!",
    });
    return;
  }

  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!commentData) {
      res.status(404).json({
        message: "No comment found with this id!",
      });
    }
    // console.log(categoryData);
    res.status(200).json({ message: "Successfully deleted comment" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
