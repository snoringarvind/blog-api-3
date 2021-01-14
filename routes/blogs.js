const express = require("express");
const router = express.Router();
const homePageController = require("../controllers/homePageController");
const guestController = require("../controllers/guestController");

//home page //* '/blogs' page
router.get("/", homePageController.blog_list);

router.post("/signup", guestController.signup_post);

module.exports = router;
