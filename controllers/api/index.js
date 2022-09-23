const router = require("express").Router();
const userRoutes = require("./user-routes");
const searchRoutes = require("./search-routes.js");

router.use("/user", userRoutes);
router.use("/search-routes", searchRoutes);

module.exports = router;
