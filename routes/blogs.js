const express = require("express");
const router = express.Router();
const homePageController = require("../controllers/homePageController");
const guestController = require("../controllers/guestController");
const loginController = require("../controllers/loginController");

//home page //* '/blogs' page
router.get("/", homePageController.blog_list);

router.post("/signup", guestController.signup_post);

router.post("/login", loginController.login_post);

router.get("/protected", loginController.protected_route);

module.exports = router;
