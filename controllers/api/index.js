const router = require("express").Router();
const userRoutes = require("./user-routes");

const searchRoutes = require("./search-routes.js");
const commentRoutes = require("./comment-routes");

router.use("/user", userRoutes);
router.use("/search", searchRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
