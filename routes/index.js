const express = require("express");
const route = express.Router();

//Get home page
route.get("/", (req, res) => {
  res.send("This is note routerlication of home page.");
});

//Not Found
route.get("*", (req, res) => {
  res.status(404).send("404 Not Found");
});

module.exports = route;
