const express = require("express");
const router = express.Router();
const homePageController = require("../controllers/homePageController");
const guestController = require("../controllers/guestController");
const loginController = require("../controllers/loginController");
const adminController = require("../controllers/adminController");
const utils = require("../libs/utils");

//home page //* '/blogs' list page
router.get("/", homePageController.blog_list);

//create blog
router.get(
  "/create",
  utils.verifyJWT,
  utils.verifyAdmin,
  adminController.blog_create_get
);
router.post(
  "/",
  utils.verifyJWT,
  utils.verifyAdmin,
  adminController.blog_create_post
);

//signup
router.get("/signup", guestController.signup_get);
router.post("/signup", guestController.signup_post);

//login
router.get("/login", loginController.login_get);
router.post("/login", loginController.login_post);

//protected
router.get("/protected", loginController.protected_route);

//update blog
router.get(
  "/:id/update",
  utils.verifyJWT,
  utils.verifyAdmin,
  adminController.blog_update_get
);

router.put(
  "/:id",
  utils.verifyJWT,
  utils.verifyAdmin,
  adminController.blog_update_put
);

//comments
router.post("/comment", utils.verifyJWT, guestController.comment_create_post);

//delete
router.delete(
  "/:id",
  utils.verifyJWT,
  utils.verifyAdmin,
  adminController.blog_delete
);

//get detail
router.get("/:id", guestController.blog_detail_get);

module.exports = router;
