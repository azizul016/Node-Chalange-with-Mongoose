const { validationResult } = require("express-validator");
//hashing password;
const bcrypt = require("bcryptjs");

//lodash
const _ = require("lodash");

const User = require("../models/users");

//get all users
module.exports.getUsersController = async (req, res) => {
  // console.log(req.user);
  try {
    const users = await User.find({}, "-password");
    res.send(users);
  } catch (err) {
    return res.status(500).send(err);
  }
};

//add user
module.exports.addUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(errors.array());
  }
  const pickProperty = _.pick(req.body, [
    "firstName",
    "lastName",
    "email",
    "password",
    "confirmPassword",
  ]);
  // const user = new User(req.body);
  const user = new User(pickProperty);
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) return res.status(400).send("User already registered");
    await user.save();
    // res.send(user, "-password");
    res.send({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    })
  } catch (err) {
    return res.status(500).send(err);
  }
};

//get single user
module.exports.getUserController = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(404).send(errors.array());
  // }
  try {
    // const id = req.params.userId;
    const id = req.user._id;
    const user = await User.findById(id, "-password");
    if (!user) return res.status(404).send("User not exist");
    res.send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
};

//user login
module.exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check user email
    const user = await User.findOne({ email: email });
    // console.log(user);
    if (!user) return res.status(400).send("Unable to logged in");
    //check user password
    const isMatched = bcrypt.compare(password, user.password);
    if (!isMatched) return res.status(400).send("Unable to logged in");
    //successfully log in

    //generate auth token;
    const token = user.generateAuthToken();
    // res.header('x-auth-token', token);
    // if i pass token in header then every time pass this token manually.
    //but i pass token in cookie then it pass server autometically.
    res.cookie("auth", token, {
      httpOnly: true,
      sameSite: true,
      signed: true,
      maxAge: 4 * 60 * 60 * 1000,
    });
    // console.log(token);

    res.send("success");
  } catch (err) {
    return res.status(500).send(err);
  }
};

//user logout;
module.exports.logoutController = (req, res) => {
  res.clearCookie("auth");
  res.send("Successfully logged out");
};
