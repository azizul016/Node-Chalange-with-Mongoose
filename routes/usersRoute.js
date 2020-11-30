const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  getUsersController,
  addUserController,
  getUserController,
  loginController,
  logoutController
} = require("../controlers/userController");
// const { route } = require("./notesRoute");


//middleware
const {auth} = require('../middleware/auth')
const {admin} = require('../middleware/admin')

//get all user;
router.get("/", [auth, admin], getUsersController);

//add user;
router.post(
  "/", 
  [
    check("firstName", "First Name is required").notEmpty(),
    check("lastName", "Last Name is required").notEmpty(),
    check("email", "Email is required").notEmpty(),
    check("email", "Email must be valid").isEmail(),
    check("password", "Password must be required").notEmpty(),
    check("password", "Password must be 6 character").isLength({ min: 6 }),
    check("confirmPassword", "Confirm Password must be required").notEmpty(),
    check("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Password dose not match");
      } else {
        return true;
      }
    }),
    check("password").custom((value) => {
      const password = value.toLowerCase().includes("password");
      if (password) {
        throw new Error("Password contain 'password' words");
      } else {
        return true;
      }
    }),
  ],
  addUserController
);

//get single user;
router.get(
  "/me", auth,
  // "/:userId",
  // check("userId", "User not found").isMongoId(),
  getUserController
);


//login user
router.post("/login", loginController)

//logout user
router.post("/logout",auth, logoutController)

module.exports = router;
