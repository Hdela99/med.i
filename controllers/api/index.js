const router = require("express").Router();
const userRoutes = require("./user-routes");
<<<<<<< HEAD
const searchRoutes = require("./search-routes");

router.use("/user", userRoutes);
router.use("/search", searchRoutes);
=======
const searchRoutes = require("./search-routes.js");
const commentRoutes = require("./comment-routes");

router.use("/user", userRoutes);
router.use("/search-routes", searchRoutes);
router.use("/comment-routes", commentRoutes);
>>>>>>> main

module.exports = router;
