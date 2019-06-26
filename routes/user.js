const router = require("express").Router();
const userController = require("../controller/userQueries");
// const buddy = require("../../controller/buddyQueries");
// const helper = require("../../utils/helperFunctions");

// Matches with "/api/user"
router.route("/").get(userController.getAllUsers);

// Matches with "/api/user/:id"
router.route("/:id").get(userController.findUser);

module.exports = router;
