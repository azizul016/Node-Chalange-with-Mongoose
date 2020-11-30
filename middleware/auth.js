const jwt = require("jsonwebtoken");
const User = require("../models/users");
// console.log(process.env.JWT_SECRET);
module.exports.auth = async (req, res, next) => {
  if (req.signedCookies) {
    //access cookie auth token
    const cookieTokenAuth = req.signedCookies["auth"];
    try {
      //verify token auth
      const decode = jwt.verify(cookieTokenAuth, process.env.JWT_SECRET);
      //getting user
      const user = await User.findById(decode.id);
      req.user = user;
      // i take a new "user" property and inject it into main user line no 12;
      next();
    } catch (err) {
      return res.status(401).send("Unauthorized token");
    }
  } else {
    return res.status(401).send("No token provider or unauthorized");
  }
};
