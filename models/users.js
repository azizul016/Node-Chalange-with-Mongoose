const mongoose = require("mongoose");
//jwt token
const jwt = require("jsonwebtoken");
//validator js
const validator = require("validator");
//hashing password;
const bcrypt = require("bcryptjs");

const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "Must be a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    validate: {
      validator: function (value) {
        return !value.toLowerCase().includes("password");
        // at least one number, one lowercase and one uppercase letter
        // at least six characters
        // return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(value);
      },
      message: "Password must not contain 'Password'",
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
});

//jwt token pass with secret key;
usersSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1h" });
  return token;
};


usersSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 10);
  if (this.isModified("password")) {
    this.password = hashedPassword;
  }
  next();
});

const User = mongoose.model("User", usersSchema);
module.exports = User;
