const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//POST route Comment
router.post("/", withAuth, async (req, res) => {
  try {

    req.body.user_id = req.session.userID;
    const commentData = await Comment.create(req.body);
    res.status(200).json(commentData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

//PUT route Comment
router.put("/:id", withAuth, async (req, res) => {
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
router.delete("/:id", withAuth, async (req, res) => {
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
